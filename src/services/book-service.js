const databaseService = require('./database-service');



module.exports = {
    getAllBooks: getAllBooks,
    addBooks: addBooks,
    deleteBooks: deleteBooks,
    getAllAuthors: getAllAuthors,
    addAuthors: addAuthors,
    deleteAuthors: deleteAuthors,
    getAllMembers: getAllMembers,
    addMembers: addMembers,
    deleteMembers: deleteMembers,
    getBooksbyGenre: getBooksbyGenre,
    getBooksbyAuthor: getBooksbyAuthor,
    addBookCopy: addBookCopy,
    obtainIB: obtainID,
    //allocateGenres: allocateGenres,
    //allocateAuthor: allocateAuthor,
  
};

function getAllBooks(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Books';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
};


function addBooks(NAME, PUBLISH_DATE, LANGUAGE, COPYNUM, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO libraryOfWorms.Books (NAME, PUBLISH_DATE, LANGUAGE) VALUES (?, ?, ?)';
    const parameters = [NAME, PUBLISH_DATE, LANGUAGE];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback(results);
        console.log(`\n${NAME} added successfully!`);

        obtainID(() => addBookCopy(results.insertId, COPYNUM))
    });

    //allocateAuthor();

    //allocateGenres();



};


function obtainID(callback) {
    const connection = databaseService.getConnection();
    const query = 'SELECT LAST_INSERT_ID();';
    
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addBookCopy(BookID, COPYNUM) {
    const connection = databaseService.getConnection();
    console.log(BookID);

    const query = 'INSERT INTO libraryOfWorms.Inventory (BookID) VALUES (?)';
    const parameters = [BookID]

    for (let i = 0; i < COPYNUM; i++) {
        connection.query(query, parameters);
    }
    console.log(`${COPYNUM} copies of ${BookID} added successfully.`);
}

// function allocateGenres(Genre, BookID) {
//     const connection = databaseService.getConnection();

//     for (let i =0; i < 4; i++) {
//     const query = `INSERT INTO libraryOfWorms.genreMappingTable (GENRE, BOOKID) VALUES (? ,? );`
//     const parameters = [Genre, BookID];
//     connection.query(query, parameters, function (error, results, fields) {
//         if (error) throw error;
//         callback(results);
//     });
//     }
//     }

// function allocateAuthor() {
//     const connection = databaseService.getConnection();

//     if (authorInput = libraryOfWorms.Authors.NAME) {
//         const query = `INSERT INTO libraryOfWorms.AuthorBookMappingTable (AuthorID, BookID) VALUES (?,?)`
//         const parameters = [AuthorID, BookID];
//         connection.query(query, parameters, function (error, results, fields) {
//             if (error) throw error;
//             callback();
//         });
//     }
//     else {
//         addAuthors();
//     }
//         const query = `INSERT INTO libraryOfWorms.AuthorBookMappingTable (AuthorID, BookID) VALUES (?,?)`
//         const parameters = [AuthorID, BookID];
//         connection.query(query, parameters, function (error, results, fields) {
//             if (error) throw error;
//             callback();
//     }
//         )};
 

function addAuthors(NAME, DOB, DOD, NATIONALITY, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO Authors (NAME, DOB, DOD, NATIONALITY) VALUES (?, ?, ?, ?)';
    const parameters = [NAME, DOB, DOD, NATIONALITY];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function deleteBooks(bookID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM libraryOfWorms.technologies WHERE id = ?';
    const parameters = [bookID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}

function getAllAuthors(callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Authors';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}




function deleteAuthors(authorID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM Authors WHERE id = ?';
    const parameters = [authorID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function getAllMembers (callback) {
    const connection = databaseService.getConnection();

    const query = 'SELECT * FROM Members';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}


function addMembers(NAME, DOB, SIGN_UP, DECEASED, callback) {
    const connection = databaseService.getConnection();

    const query = 'INSERT INTO Authors (NAME, DOB, SIGN_UP, DECEASED) VALUES (?, ?, ?, ?)';
    const parameters = [NAME, DOB, SIGN_UP, DECEASED];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function deleteMembers(memberID, callback) {
    const connection = databaseService.getConnection();

    const query = 'DELETE FROM Members WHERE id = ?';
    const parameters = [memberID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
}


function getBooksbyGenre(Genre, BookID) {
    const connection = databaseService.getConnection();

    const query = `SELECT * FROM GenreMappingTable 
                   JOIN Books on GenreMappingTable.BookID = Books.ID
                   WHERE Genre = (?)`

    const parameters = [Genre, BookID];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });

}

function getBooksbyAuthor(NAME) {
    const connection = databaseService.getConnection();

    const query = `SELECT * FROM Authors 
                     JOIN AuthorBookMappingTable on Authors.ID = AuthorBookMappingTable.AuthorID
                     JOIN Books on AuthorBookMappingTable.BookID = Books.ID
                     WHERE Authors.Name = (?);`

    const parameters = [NAME];

    connection.query(query, parameters, function (error, results, fields) {
        if (error) throw error;
        callback();
    });
};