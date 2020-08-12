import Grades from '../controllers/grades.js';

const routes = (app) => {
  const controller = new Grades();

  app.route('/v1/grades').post(controller.create);

  app
    .route('/v1/grades/:id')
    .put(controller.update)
    .delete(controller.delete)
    .get(controller.getById);

  app.route('/v1/totals-grade').get(controller.totalGradeInSubjectByStudent);

  app.route('/v1/averages-grade').get(controller.averageBySubjectAndType);

  app.route('/v1/toppest-grade').get(controller.toppestGradesBySubjectAndType);
};

export default routes;
