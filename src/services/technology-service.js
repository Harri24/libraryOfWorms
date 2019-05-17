const databaseService = require('./database-service');



// module.exports = {
//     getAllBooks: getAllBooks,
//     addBooks: addBooks,
//     deleteBooks: deleteBooks,
//     getAllAuthors: getAllAuthors,
//     addAuthors: addAuthors,
//     deleteAuthors: deleteAuthors,
//     getAllMembers: getAllMembers,
//     addMembers: addMembers,
//     deleteMembers: deleteMembers,
//     getBooksbyGenre: getBooksbyGenre,
//     getBooksbyAuthor: getBooksbyAuthor,
//     addBookCopy: addBookCopy,
//     obtainIB: obtainID,
//     allocateGenres: allocateGenres,
//     allocateAuthor: allocateAuthor,
//     bookOnLoan: bookOnLoan
// };

module.exports = {
    getAllTechnologies: getAllTechnologies,
    addTechnology: addTechnology,
    deleteTechnology: deleteTechnology
};

function getAllTechnologies(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM technologies';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addTechnology(name, logoUrl, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO technologies (name, logoUrl) VALUES (?, ?)';
    const parameters = [name, logoUrl];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function deleteTechnology(technologyId, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM technologies WHERE id = ?';
    const parameters = [technologyId];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });

};