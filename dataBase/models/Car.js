module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'cars',
        timestamps: false
    });
    return Car
};
