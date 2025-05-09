import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hourHeight, setHourHeight] = useState(80); // Dynamic hour height
  const calendarRef = useRef(null); // Ref to measure container height
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACK_END_URL;
  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${backendURL}/api/appointments/getAll`);
        const data = await response.json();
        const appointments = data.DT;
        console.log(appointments);
        const mappedEvents = appointments.map((appointment) => {
          const startDateTime = new Date(appointment.appointmentDateTime);
          const endDateTime = new Date(
            startDateTime.getTime() + appointment.duration * 60000
          );
          const startTime = `${startDateTime
            .getUTCHours()
            .toString()
            .padStart(2, "0")}:${startDateTime
            .getUTCMinutes()
            .toString()
            .padStart(2, "0")}`;
          const endTime = `${endDateTime
            .getUTCHours()
            .toString()
            .padStart(2, "0")}:${endDateTime
            .getUTCMinutes()
            .toString()
            .padStart(2, "0")}`;
          const dayOfWeek = startDateTime.getDay() + 1;

          return {
            id: appointment.appointmentID,
            title: `${appointment.serviceType} - ${appointment.deviceCategory}`,
            startTime,
            endTime,
            color: `bg-${getColorForServiceType(appointment.serviceType)}-500`,
            statusColor: getColorForStatus(appointment.status),
            day: dayOfWeek,
            status: appointment.status,
            description: appointment.notes || "No notes provided",
            location: appointment.serviceLocation,
            attendees: [
              appointment.customerName,
              appointment.employeeName,
            ].filter(Boolean),
            organizer: appointment.employeeName || "Unassigned",
            date: startDateTime,
          };
        });

        setEvents(mappedEvents);
        if (mappedEvents.length > 0) {
          const firstAppointmentDate = new Date(
            Math.min(...mappedEvents.map((e) => new Date(e.date)))
          );
          setCurrentWeekStart(firstAppointmentDate);
        } else {
          setCurrentWeekStart(new Date());
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Helper functions
  const getColorForServiceType = (serviceType) => {
    const colorMap = {
      repair: "blue",
      assembly: "green",
      installation: "purple",
      purchase: "yellow",
      consultation: "indigo",
      maintenance: "pink",
      upgrade: "teal",
      data_recovery: "cyan",
      warranty_service: "orange",
      software_installation: "red",
      other: "gray",
    };
    return colorMap[serviceType] || "gray";
  };

  const getColorForStatus = (status) => {
    const statusColorMap = {
      pending: "bg-yellow-500",
      confirmed: "bg-green-500",
      in_progress: "bg-blue-500",
      completed: "bg-gray-500",
      cancelled: "bg-red-500",
    };
    return statusColorMap[status] || "bg-gray-500";
  };

  const allStatuses = [
    { name: "pending", color: getColorForStatus("pending") },
    { name: "confirmed", color: getColorForStatus("confirmed") },
    { name: "in_progress", color: getColorForStatus("in_progress") },
    { name: "completed", color: getColorForStatus("completed") },
    { name: "cancelled", color: getColorForStatus("cancelled") },
  ];

  const [myCalendars, setMyCalendars] = useState(allStatuses);
  console.log(setMyCalendars);

  // Update week dates and current month/date
  useEffect(() => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const newWeekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date.getDate();
    });

    setWeekDates(newWeekDates);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setCurrentMonth(
      `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`
    );
    setCurrentDate(`${monthNames[startOfWeek.getMonth()]} ${newWeekDates[0]}`);
  }, [currentWeekStart]);

  // Calculate dynamic hour height based on container size
  useEffect(() => {
    const updateHourHeight = () => {
      if (calendarRef.current) {
        const containerHeight = calendarRef.current.clientHeight;
        const totalHours = 24; // 24 giờ
        const headerHeight = 80; // Chiều cao header
        const availableHeight = containerHeight - headerHeight;
        const newHourHeight = Math.max(20, availableHeight / totalHours); // Giảm min height để phù hợp
        setHourHeight(newHourHeight);
      }
    };

    updateHourHeight();
    window.addEventListener("resize", updateHourHeight);
    return () => window.removeEventListener("resize", updateHourHeight);
  }, []);

  // Set isLoaded and showAIPopup
  useEffect(() => {
    let isMounted = true;

    const loadTimer = setTimeout(() => {
      if (isMounted) setIsLoaded(true);
    }, 100);

    const popupTimer = setTimeout(() => {
      if (isMounted) setShowAIPopup(true);
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
        } else clearInterval(typingInterval);
      }, 50);

      return () => {
        isMounted = false;
        clearInterval(typingInterval);
      };
    }
  }, [showAIPopup]);

  const handleEventClick = (event) => setSelectedEvent(event);

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

  const handleToday = () => setCurrentWeekStart(new Date());

  const getEventsForCurrentWeek = () => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  };

  const daysInMonth = new Date(
    currentWeekStart.getFullYear(),
    currentWeekStart.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentWeekStart.getFullYear(),
    currentWeekStart.getMonth(),
    1
  ).getDay();
  const miniCalendarDays = Array.from(
    { length: daysInMonth + firstDayOfMonth },
    (_, i) => (i < firstDayOfMonth ? null : i - firstDayOfMonth + 1)
  );

  const daysWithAppointments = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    if (
      eventDate.getMonth() === currentWeekStart.getMonth() &&
      eventDate.getFullYear() === currentWeekStart.getFullYear()
    ) {
      acc.add(eventDate.getDate());
    }
    return acc;
  }, new Set());

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 giờ)

  const calculateEventStyle = (startTime, endTime) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);

    const start = startHour + startMinute / 60;
    const end = endHour + endMinute / 60;

    const top = start * hourHeight; // Bắt đầu từ 0h
    const height = (end - start) * hourHeight;

    return { top: `${top}px`, height: `${height}px` };
  };
  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 ${fadeInClass}`}
        style={{ transitionDelay: "0.2s" }}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-white p-2 rounded-full hover:bg-white/20"
            title="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-600 transition-colors"
            title="Back to Admin"
          >
            <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Admin</span>
          </button>
          <span className="text-xl sm:text-2xl font-semibold text-white drop-shadow-lg hidden sm:block">
            Appointments
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search input (optional) */}
        </div>
      </header>

      <main className="relative h-screen w-full pt-16 sm:pt-20 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed sm:static top-0 left-0 h-full w-64 sm:w-[20%] max-w-[250px] bg-white/10 backdrop-blur-lg p-4 shadow-xl border-r border-white/20 rounded-tr-3xl ${fadeInClass} transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          } flex flex-col justify-between z-20`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm sm:text-base">
                  {currentMonth}
                </h3>
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
                          new Date().getMonth() ===
                            currentWeekStart.getMonth() &&
                          new Date().getFullYear() ===
                            currentWeekStart.getFullYear()
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
              <h3 className="text-white font-medium mb-3 text-sm sm:text-base">
                My calendars
              </h3>
              <div className="space-y-2">
                {myCalendars.map((cal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                    <span className="text-white text-xs sm:text-sm">
                      {cal.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col ${fadeInClass}`}
          style={{ transitionDelay: "0.6s" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleToday}
                className="px-3 sm:px-4 py-2 text-white bg-blue-500 rounded-md text-sm sm:text-base"
              >
                Today
              </button>
              <div className="flex">
                <button
                  onClick={handlePreviousWeek}
                  className="p-2 text-white hover:bg-white/10 rounded-l-md"
                >
                  <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
                <button
                  onClick={handleNextWeek}
                  className="p-2 text-white hover:bg-white/10 rounded-r-md"
                >
                  <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {currentDate}
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-md p-1">
              <button
                onClick={() => setCurrentView("week")}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  currentView === "week" ? "bg-white/20" : ""
                } text-white`}
              >
                Week
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4" ref={calendarRef} style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {currentView === "week" && (
              <div className="">
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
                        className={`text-base sm:text-lg font-medium mt-1 text-white ${
                          weekDates[i] === new Date().getDate() &&
                          new Date().getMonth() ===
                            currentWeekStart.getMonth() &&
                          new Date().getFullYear() ===
                            currentWeekStart.getFullYear()
                            ? "bg-blue-500 rounded-full w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center mx-auto"
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
                        className="border-b border-white/10 pr-2 text-right text-xs"
                        style={{ height: `${hourHeight}px` }}
                      >
                        {time === 0
                          ? "12 AM"
                          : time < 12
                          ? `${time} AM`
                          : time === 12
                          ? "12 PM"
                          : `${time - 12} PM`}
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
                          className="border-b border-white/10"
                          style={{ height: `${hourHeight}px` }}
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
                              className={`absolute ${event.statusColor} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg`}
                              style={{
                                ...eventStyle,
                                left: "4px",
                                right: "4px",
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <div className="font-medium truncate">
                                {event.title}
                              </div>
                              <div className="opacity-80 text-[10px] mt-1">{`${event.startTime} - ${event.endTime}`}</div>
                              <div className="text-[10px] opacity-70">{`Status: ${event.status}`}</div>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentView === "day" && (
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full text-white text-center p-4">
                Day view not fully implemented yet. Click "Week" to see events.
              </div>
            )}
            {currentView === "month" && (
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full text-white text-center p-4">
                Month view not fully implemented yet. Click "Week" to see
                events.
              </div>
            )}
          </div>
        </div>

        {/* AI Popup */}
        {showAIPopup && (
          <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-20">
            <div className="w-full max-w-[90vw] sm:max-w-[450px] relative bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-blue-300/30 text-white">
              <button
                onClick={() => setShowAIPopup(false)}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-blue-300" />
                </div>
                <div className="min-h-[60px] sm:min-h-[80px]">
                  <p className="text-sm sm:text-base font-light">{typedText}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
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

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div
              className={`${selectedEvent.statusColor} p-4 sm:p-6 rounded-lg shadow-xl max-w-[90vw] sm:max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                {selectedEvent.title}
              </h3>
              <div className="space-y-3 text-white text-sm sm:text-base">
                <p className="flex items-center">
                  <Clock className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  {`${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  {selectedEvent.location}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  {`${weekDays[selectedEvent.day - 1]}, ${new Date(
                    selectedEvent.date
                  ).getDate()} ${currentMonth}`}
                </p>
                <p className="flex items-start">
                  <Users className="mr-2 h-4 sm:h-5 w-4 sm:w-5 mt-1" />
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
                <p>
                  <strong>Status:</strong> {selectedEvent.status}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  className="bg-white text-gray-800 px-3 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors text-sm sm:text-base"
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
