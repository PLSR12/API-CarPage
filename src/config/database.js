module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'postgres',
	database: 'vehicles',
	port: 5432,
	define: {
		timespamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
