// controllers/scheduleController.js
const Schedule = require('../models/Schedule');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourseSchedule = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const schedule = await Schedule.find({ course: courseId })
      .populate('course', 'name');
      
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener horario' });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { courseId, dayOfWeek, startTime, endTime, classroom } = req.body;
    
    const schedule = new Schedule({
      course: courseId,
      dayOfWeek,
      startTime,
      endTime,
      classroom
    });
    
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear horario' });
  }
};

exports.recordAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { studentId, date, status } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    
    course.attendance.push({
      student: studentId,
      date,
      status
    });
    
    await course.save();
    res.json(course.attendance);
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar asistencia' });
  }
};
