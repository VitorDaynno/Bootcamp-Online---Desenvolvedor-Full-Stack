import Logger from '../../config/logger.js';
import GradesBO from '../../business/gradesBO.js';

const logger = Logger('Grades');

class Grades {
  async create(req, res) {
    try {
      logger.info('Started create grade');
      const body = req.body ? req.body : {};
      const business = new GradesBO();
      const response = await business.create(body);
      res.status(201).json(response);
    } catch (error) {
      logger.error('An error occurred when create grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      logger.info('Started update grade');
      const id = req.params.id ? +req.params.id : 0;
      const body = req.body ? req.body : {};
      const business = new GradesBO();
      const response = await business.update(id, body);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when update grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      logger.info('Started delete grade');
      const id = req.params.id ? +req.params.id : 0;
      const business = new GradesBO();
      const response = await business.delete(+id);
      res.status(204).json(response);
    } catch (error) {
      logger.error('An error occurred when delete grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      logger.info('Started get by id');
      const id = req.params.id ? +req.params.id : 0;
      const business = new GradesBO();
      const response = await business.getById(+id);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get by id: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async totalGradeInSubjectByStudent(req, res) {
    try {
      logger.info('Started total grade in subject by student');
      const { student, subject } = req.query;
      const business = new GradesBO();
      const response = await business.totalGradeInSubjectByStudent(
        student,
        subject
      );
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get total grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async averageBySubjectAndType(req, res) {
    try {
      logger.info('Started average grade in subject by student');
      const { subject, type } = req.query;
      const business = new GradesBO();
      const response = await business.averageBySubjectAndType(subject, type);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get average grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async toppestGradesBySubjectAndType(req, res) {
    try {
      logger.info('Started average grade in subject by student');
      const { subject, type } = req.query;
      const business = new GradesBO();
      const response = await business.toppestGradesBySubjectAndType(
        subject,
        type
      );
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get average grade: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
}

export default Grades;
