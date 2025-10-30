import type { EventContentArg } from '@fullcalendar/core';
import { format } from 'date-fns';
import { downloadICS } from '~/lib/generateICS';

interface EventTooltipProps {
  event: EventContentArg;
}

export default function EventTooltip({ event }: EventTooltipProps) {
  const eventObj = event.event;
  const start = format(eventObj.start!, 'MMM d, yyyy h:mm a');
  const end = eventObj.end ? format(eventObj.end, 'MMM d, yyyy h:mm a') : null;
  const organizer = eventObj.extendedProps.organizer?.name || 'Unknown';
  const tags = ["FAKE TAG 1,", "FAKE TAG 2"]

  return (
    <div className="w-72 overflow-hidden rounded-lg bg-white p-4 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="space-y-3 text-gray-600">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Start</p>
            <p className="font-medium text-gray-900">{start}</p>
          </div>
        </div>

        {end && (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L9 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1">
              <p className="text-xs text-gray-500">End</p>
              <p className="font-medium text-gray-900">{end}</p>
            </div>
          </div>
        )}

        {eventObj.extendedProps.location && (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7.58172 2 4 5.58172 4 10C4 14.0797 7.04334 17.0881 10.7317 17.8V21H13.2683V17.8C16.9567 17.0881 20 14.0797 20 10C20 5.58172 16.4183 2 12 2ZM12 15C9.23858 15 7 12.7614 7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10C17 12.7614 14.7614 15 12 15Z" fill="currentColor"/>
            </svg>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{eventObj.extendedProps.location}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Organizer</p>
            <p className="font-medium text-gray-900">{organizer}</p>
            
            <p className="text-xs text-gray-500">Tags</p>
            <p className="font-medium text-gray-900">{tags}</p> {/*Figure out how to style this later*/}
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const eventData = {
                id: eventObj.id,
                title: eventObj.title,
                start: new Date(eventObj.start!),
                end: new Date(eventObj.end!),
                allDay: eventObj.allDay,
                location: eventObj.extendedProps.location,
                organizerId: eventObj.extendedProps.organizerId
              };
              downloadICS(eventData);
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}