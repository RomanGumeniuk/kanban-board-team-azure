module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },    
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      task_id: {
        type: Sequelize.INTEGER // Use INTEGER instead of NUMBER
      }
    }, {
      tableName: 'note', // Specify the existing table name
      timestamps: false // If your table doesn't have createdAt and updatedAt columns
    });
  
    return Note;
  };
  