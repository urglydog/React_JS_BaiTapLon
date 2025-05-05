import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Menu,
  Clock,
  MapPin,
  Users,
  Calendar,
  Pause,
  Sparkles,
  X,
} from "lucide-react";
import "./taro.css";
import { useNavigate } from "react-router-dom";

function VIPCalendar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState("week");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const navigate = useNavigate();

  // Fetch appointments and set up the calendar
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order/getAllAppointments');
        const data = await response.json();
        const appointments = data.DT; // Extract the DT array

        // Map appointments to events
        const mappedEvents = appointments.map((appointment, index) => {
          const startDateTime = new Date(appointment.appointmentDateTime);
          const endDateTime = new Date(startDateTime.getTime() + appointment.duration * 60000);

          const dayOfWeek = startDateTime.getDay() + 1; // getDay() returns 0-6 (Sun-Sat), adjust to 1-7
          const startTime = startDateTime.toTimeString().slice(0, 5);
          const endTime = endDateTime.toTimeString().slice(0, 5);
          console.log(index);
          
          return {
            id: appointment.appointmentID,
            title: `${appointment.serviceType} - ${appointment.deviceCategory}`,
            startTime,
            endTime,
            color: `bg-${getColorForServiceType(appointment.serviceType)}-500`,
            day: dayOfWeek,
            description: appointment.notes || "No notes provided",
            location: appointment.serviceLocation,
            attendees: [appointment.customerName, appointment.employeeName].filter(Boolean),
            organizer: appointment.employeeName || "Unassigned",
            date: startDateTime, // Store the full date for filtering
          };
        });

        setEvents(mappedEvents);

        // Set the current week to the week of the first appointment, or current week if none
        if (mappedEvents.length > 0) {
          const firstAppointmentDate = new Date(mappedEvents[0].date);
          setCurrentWeekStart(firstAppointmentDate);
        } else {
          setCurrentWeekStart(new Date());
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Helper function to assign colors based on service type
  const getColorForServiceType = (serviceType) => {
    const colorMap = {
      repair: 'blue',
      assembly: 'green',
      installation: 'purple',
      purchase: 'yellow',
      consultation: 'indigo',
      maintenance: 'pink',
      upgrade: 'teal',
      data_recovery: 'cyan',
      warranty_service: 'orange',
      software_installation: 'red',
      other: 'gray',
    };
    return colorMap[serviceType] || 'gray';
  };

  // Update week dates and current month/date when currentWeekStart changes
  useEffect(() => {
    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    // Generate the dates for the week
    const newWeekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date.getDate();
    });

    setWeekDates(newWeekDates);

    // Update current month and date
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setCurrentMonth(`${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`);
    setCurrentDate(`${monthNames[startOfWeek.getMonth()]} ${newWeekDates[0]}`);
  }, [currentWeekStart]);

  // Set isLoaded to true when component mounts - with cleanup
  useEffect(() => {
    let isMounted = true;

    const loadTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoaded(true);
      }
    }, 100);

    const popupTimer = setTimeout(() => {
      if (isMounted) {
        setShowAIPopup(true);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(loadTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  // Handle AI popup typing animation
  useEffect(() => {
    if (showAIPopup) {
      const text =
        "Looks like you don't have that many meetings today. Shall I play some Hans Zimmer essentials to help you get into your Flow State?";
      let i = 0;
      let isMounted = true;

      const typingInterval = setInterval(() => {
        if (i < text.length && isMounted) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => {
        isMounted = false;
        clearInterval(typingInterval);
      };
    }
  }, [showAIPopup]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Navigation for previous/next week
  const handlePreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleToday = () => {
    setCurrentWeekStart(new Date());
  };

  // Filter events for the current week
  const getEventsForCurrentWeek = () => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  };

  // Calculate mini calendar days and highlight days with appointments
  const daysInMonth = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), 1).getDay();
  const miniCalendarDays = Array.from(
    { length: daysInMonth + firstDayOfMonth },
    (_, i) => (i < firstDayOfMonth ? null : i - firstDayOfMonth + 1)
  );

  // Find days with appointments
  const daysWithAppointments = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    if (eventDate.getMonth() === currentWeekStart.getMonth() && eventDate.getFullYear() === currentWeekStart.getFullYear()) {
      acc.add(eventDate.getDate());
    }
    return acc;
  }, new Set());

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8); // 8 AM to 4 PM

  const calculateEventStyle = (startTime, endTime) => {
    const start =
      parseInt(startTime.split(":")[0]) +
      parseInt(startTime.split(":")[1]) / 60;
    const end =
      parseInt(endTime.split(":")[0]) + parseInt(endTime.split(":")[1]) / 60;
    const top = (start - 8) * 80; // 80px per hour
    const height = (end - start) * 80;
    return { top: `${top}px`, height: `${height}px` };
  };

  const myCalendars = [
    { name: "My Calendar", color: "bg-blue-500" },
    { name: "Work", color: "bg-green-500" },
    { name: "Personal", color: "bg-purple-500" },
    { name: "Family", color: "bg-orange-500" },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const fadeInClass = isLoaded
    ? "opacity-100 transition-opacity duration-500 ease-out"
    : "opacity-0";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <header
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6 ${fadeInClass}`}
        style={{ transitionDelay: "0.2s" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-600 transition-colors"
            title="Back to Admin"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Admin</span>
          </button>
          <Menu className="h-6 w-6 text-white" />
          <span className="text-2xl font-semibold text-white drop-shadow-lg">
            Appointments
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Search"
              className="rounded-full bg-white/10 backdrop-blur-sm pl-10 pr-4 py-2 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </header>

      <main className="relative h-screen w-full pt-20 flex">
        <div
          className={`w-64 h-full bg-white/10 backdrop-blur-lg p-4 shadow-xl border-r border-white/20 rounded-tr-3xl ${fadeInClass} flex flex-col justify-between`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div>
            

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">{currentMonth}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentWeekStart);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentWeekStart(newDate);
                    }}
                    className="p-1 rounded-full hover:bg-white/20"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentWeekStart);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentWeekStart(newDate);
                    }}
                    className="p-1 rounded-full hover:bg-white/20"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className="text-xs text-white/70 font-medium py-1"
                  >
                    {day}
                  </div>
                ))}

                {miniCalendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-xs rounded-full w-7 h-7 flex items-center justify-center ${
                      day && daysWithAppointments.has(day)
                        ? "bg-blue-500 text-white"
                        : day === new Date().getDate() &&
                          new Date().getMonth() === currentWeekStart.getMonth() &&
                          new Date().getFullYear() === currentWeekStart.getFullYear()
                        ? "bg-gray-500 text-white"
                        : "text-white hover:bg-white/20"
                    } ${!day ? "invisible" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">My calendars</h3>
              <div className="space-y-2">
                {myCalendars.map((cal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                    <span className="text-white text-sm">{cal.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        
        </div>

        <div
          className={`flex-1 flex flex-col ${fadeInClass}`}
          style={{ transitionDelay: "0.6s" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-4">
              <button
                onClick={handleToday}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Today
              </button>
              <div className="flex">
                <button
                  onClick={handlePreviousWeek}
                  className="p-2 text-white hover:bg-white/10 rounded-l-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextWeek}
                  className="p-2 text-white hover:bg-white/10 rounded-r-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-white">
                {currentDate}
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-md p-1">
              <button
                onClick={() => setCurrentView("day")}
                className={`px-3 py-1 rounded ${
                  currentView === "day" ? "bg-white/20" : ""
                } text-white text-sm`}
              >
                Day
              </button>
              <button
                onClick={() => setCurrentView("week")}
                className={`px-3 py-1 rounded ${
                  currentView === "week" ? "bg-white/20" : ""
                } text-white text-sm`}
              >
                Week
              </button>
              <button
                onClick={() => setCurrentView("month")}
                className={`px-3 py-1 rounded ${
                  currentView === "month" ? "bg-white/20" : ""
                } text-white text-sm`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
              <div className="grid grid-cols-8 border-b border-white/20">
                <div className="p-2 text-center text-white/50 text-xs"></div>
                {weekDays.map((day, i) => (
                  <div
                    key={i}
                    className="p-2 text-center border-l border-white/20"
                  >
                    <div className="text-xs text-white/70 font-medium">
                      {day}
                    </div>
                    <div
                      className={`text-lg font-medium mt-1 text-white ${
                        weekDates[i] === new Date().getDate() &&
                        new Date().getMonth() === currentWeekStart.getMonth() &&
                        new Date().getFullYear() === currentWeekStart.getFullYear()
                          ? "bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                          : ""
                      }`}
                    >
                      {weekDates[i]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8">
                <div className="text-white/70">
                  {timeSlots.map((time, i) => (
                    <div
                      key={i}
                      className="h-20 border-b border-white/10 pr-2 text-right text-xs"
                    >
                      {time > 12 ? `${time - 12} PM` : `${time} AM`}
                    </div>
                  ))}
                </div>

                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="border-l border-white/20 relative"
                  >
                    {timeSlots.map((_, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-20 border-b border-white/10"
                      ></div>
                    ))}

                    {getEventsForCurrentWeek()
                      .filter((event) => event.day === dayIndex + 1)
                      .map((event, i) => {
                        const eventStyle = calculateEventStyle(
                          event.startTime,
                          event.endTime
                        );
                        return (
                          <div
                            key={i}
                            className={`absolute ${event.color} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg`}
                            style={{
                              ...eventStyle,
                              left: "4px",
                              right: "4px",
                            }}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="opacity-80 text-[10px] mt-1">{`${event.startTime} - ${event.endTime}`}</div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showAIPopup && (
          <div className="fixed bottom-8 right-8 z-20">
            <div className="w-[450px] relative bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-blue-300/30 text-white">
              <button
                onClick={() => setShowAIPopup(false)}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>
                <div className="min-h-[80px]">
                  <p className="text-base font-light">{typedText}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={togglePlay}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowAIPopup(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
                >
                  No
                </button>
              </div>
              {isPlaying && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-white text-sm hover:bg-white/20 transition-colors"
                    onClick={togglePlay}
                  >
                    <Pause className="h-4 w-4" />
                    <span>Pause Hans Zimmer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`${selectedEvent.color} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {selectedEvent.title}
              </h3>
              <div className="space-y-3 text-white">
                <p className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {`${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {selectedEvent.location}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {`${weekDays[selectedEvent.day - 1]}, ${
                    new Date(selectedEvent.date).getDate()
                  } ${currentMonth}`}
                </p>
                <p className="flex items-start">
                  <Users className="mr-2 h-5 w-5 mt-1" />
                  <span>
                    <strong>Attendees:</strong>
                    <br />
                    {selectedEvent.attendees.join(", ") || "No attendees"}
                  </span>
                </p>
                <p>
                  <strong>Organizer:</strong> {selectedEvent.organizer}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default VIPCalendar;