import { promises as fs } from 'fs';

import Logger from '../config/logger.js';
import DateHelper from '../helpers/dateHelper.js';

const logger = Logger('settings');

class GradesBO {
  constructor(dependencies) {
    this.dateHelper = new DateHelper();
  }

  async create(body) {
    try {
      logger.info('Starting create');

      const { student, subject, type, value } = body;
      const entity = { student, subject, type, value };

      this.validateGrade(entity);

      const grades = await this.readGrades();
      const id = grades.nextId;

      const now = this.dateHelper.now().toISOString();

      const grade = {
        id,
        ...entity,
        timestamp: now,
      };

      grades.nextId++;
      grades.grades.push(grade);

      await this.saveGrades(grades);

      return { message: 'Grade inserted' };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async update(id, body) {
    try {
      logger.info('Starting update');

      const { student, subject, type, value } = body;
      const entity = { student, subject, type, value };
      let exist = false;

      this.validateGrade(entity);

      const grades = await this.readGrades();
      const now = this.dateHelper.now().toISOString();

      const newGrades = grades.grades.map((grade) => {
        if (grade.id === id) {
          exist = true;

          const newGrade = {
            id,
            ...entity,
            timestamp: now,
          };

          return newGrade;
        }
        return grade;
      });

      if (!exist) {
        throw { statusCode: 404, message: 'Grade not found' };
      }

      grades.grades = newGrades;
      await this.saveGrades(grades);

      return { message: 'Grade updated' };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      logger.info('Starting delete');

      const grades = await this.readGrades();

      const gradeIndex = grades.grades.findIndex((grade) => grade.id == id);

      if (gradeIndex < 0) {
        throw { statusCode: 404, message: 'Grade not found' };
      }
      grades.grades.splice(gradeIndex, 1);

      await this.saveGrades(grades);

      return { message: 'Grade deleted' };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      logger.info('Starting get by id');

      const grades = await this.readGrades();

      const grade = grades.grades.find((grade) => grade.id == id);

      if (!grade) {
        throw { statusCode: 404, message: 'Grade not found' };
      }

      return grade;
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  validateGrade(grade) {
    logger.info('Verifing grade');
    const { student, subject, type, value } = grade;
    let error;

    if (!student || student === '') {
      logger.error('Student not found');
      error = { statusCode: 422, message: 'student is required' };
      throw error;
    }

    if (!subject || subject === '') {
      logger.error('Subject not found');
      error = { statusCode: 422, message: 'subject is required' };
      throw error;
    }

    if (!type || type === '') {
      logger.error('Type not found');
      error = { statusCode: 422, message: 'type is required' };
      throw error;
    }

    if (typeof value !== 'number' || value < 0) {
      error = { statusCode: 422, message: 'value must be a positive number' };
      throw error;
    }

    return true;
  }

  async readGrades() {
    logger.info('Read grades');
    const contentFile = await fs.readFile('grades.json');
    return JSON.parse(contentFile);
  }

  async saveGrades(grades) {
    logger.info('Save grades');
    await fs.writeFile('grades.json', JSON.stringify(grades));
  }

  async totalGradeInSubjectByStudent(student, subject) {
    try {
      logger.info('Starting max grade in subject');

      this.validateParam('student', student);
      this.validateParam('subject', subject);

      const grades = await this.readGrades();

      let totalGrade = 0;

      grades.grades.forEach((grade) => {
        if (
          student.toLowerCase() === grade.student.toLowerCase() &&
          subject.toLowerCase() === grade.subject.toLowerCase()
        ) {
          totalGrade = totalGrade + grade.value;
        }
      });

      return { grade: totalGrade };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async averageBySubjectAndType(subject, type) {
    try {
      logger.info('Starting max average by subject and type');

      this.validateParam('subject', subject);
      this.validateParam('type', type);

      const grades = await this.readGrades();

      let totalGrade = 0;
      let quantityGrade = 0;

      grades.grades.forEach((grade) => {
        if (
          subject.toLowerCase() === grade.subject.toLowerCase() &&
          type.toLowerCase() === grade.type.toLowerCase()
        ) {
          totalGrade = totalGrade + grade.value;
          quantityGrade++;
        }
      });

      const averageGrade = quantityGrade > 0 ? totalGrade / quantityGrade : 0;

      return { averageGrade };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async toppestGradesBySubjectAndType(subject, type) {
    try {
      logger.info('Starting toppest grades by subject and type');

      this.validateParam('subject', subject);
      this.validateParam('type', type);

      const grades = await this.readGrades();

      const filteredGrades = grades.grades.filter((grade) => {
        if (
          subject.toLowerCase() === grade.subject.toLowerCase() &&
          type.toLowerCase() === grade.type.toLowerCase()
        ) {
          return grade;
        }
      });

      filteredGrades.sort((a, b) => {
        return b.value - a.value;
      });

      const toppestGrades = filteredGrades.splice(0, 3);

      return { toppestGrades };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  validateParam(paramName, param) {
    logger.info('Verifing param');
    let error;

    if (!param || param === '') {
      logger.error(`${paramName} not found`);
      error = { statusCode: 422, message: `${paramName} is required` };
      throw error;
    }

    return true;
  }
}

export default GradesBO;
