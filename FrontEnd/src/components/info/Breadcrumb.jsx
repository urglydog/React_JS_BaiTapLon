import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb-list flex gap-2">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index !== items.length - 1 ? (
              <>
                <a href={item.url} className="breadcrumb-link">{item.label}</a>
                <span className="breadcrumb-separator">/</span>
              </>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;