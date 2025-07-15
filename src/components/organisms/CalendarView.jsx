import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CalendarSlot from "@/components/molecules/CalendarSlot";

const CalendarView = ({ sessions, selectedSession, onSessionSelect, sessionType }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate week days
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Filter sessions for selected date and type
  const availableSessions = sessions.filter(session => 
    isSameDay(new Date(session.date), selectedDate) && 
    session.type === sessionType
  );
  
  const goToPrevWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };
  
  const goToNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold text-gray-800">
          Select Date & Time
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={goToPrevWeek} variant="outline" size="sm">
            <ApperIcon name="ChevronLeft" size={20} />
          </Button>
          <Button onClick={goToNextWeek} variant="outline" size="sm">
            <ApperIcon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>
      
      {/* Week view */}
      <Card>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const daySessions = sessions.filter(session => 
              isSameDay(new Date(session.date), day) && 
              session.type === sessionType
            );
            const hasAvailability = daySessions.some(session => 
              session.bookedCount < session.maxCapacity
            );
            
            return (
              <motion.div
                key={day.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(day)}
                className={`
                  p-3 rounded-xl text-center cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'bg-primary-500 text-white' 
                    : isToday 
                      ? 'bg-accent-100 text-accent-700 hover:bg-accent-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <div className="text-xs font-medium">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-semibold">
                  {format(day, 'd')}
                </div>
                {hasAvailability && (
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
      
      {/* Time slots */}
      <div>
        <h3 className="text-lg font-display font-semibold text-gray-800 mb-4">
          Available Times - {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        
        {availableSessions.length === 0 ? (
          <Card className="text-center py-8">
            <ApperIcon name="Calendar" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No sessions available for this date</p>
          </Card>
        ) : (
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableSessions.map((session) => (
              <CalendarSlot
                key={session.Id}
                slot={session}
                isSelected={selectedSession?.Id === session.Id}
                onSelect={onSessionSelect}
                isAvailable={session.bookedCount < session.maxCapacity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;