const { Firestore } = require('@google-cloud/firestore');

const CREDENTIALS = require('../fiverr-client-eminate-vfkm-ccfa6a62c94a.json');

const firestore = new Firestore({
    projectId: CREDENTIALS.project_id,
    credentials: {
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    }
});

const userInformation = firestore.collection('userInformation');

const createDocument = async (user) => {

    try {
        let record = await userInformation.add(user);
        return {
            status: 1,
            id: record.id
        };
    } catch (error) {
        console.log(`Error at createDocument --> ${error}`);
        return {
            status: 0,
            id: ''
        };
    }
};

// createDocument(
//     {
//         name: 'Raj',
//         email: 'raj@gmail.com'
//     }
// )
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const getDocuments = async () => {

    try {
        let querySnapshot = await userInformation.get();
        if (querySnapshot.empty) {
            return {
                status: -1,
                docs: []
            };
        } else {
            let docs = []
            querySnapshot.forEach(QueryDocumentSnapshot => {
                let tempData = QueryDocumentSnapshot.data();
                tempData['id'] = QueryDocumentSnapshot.id;
                docs.push(tempData);
            });
            return {
                status: 1,
                docs: docs
            };
        }
    } catch (error) {
        console.log(`Error at getDocuments --> ${error}`);
        return {
            status: 0,
            docs: []
        };
    }
};

// getDocuments()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const getDocumentsWithWhere = async (key, value, condition) => {

    try {
        let querySnapshot = await userInformation
            .where(key, condition, value)
            .get();
        if (querySnapshot.empty) {
            return {
                status: -1,
                docs: []
            };
        } else {
            let docs = []
            querySnapshot.forEach(QueryDocumentSnapshot => {
                let tempData = QueryDocumentSnapshot.data();
                tempData['id'] = QueryDocumentSnapshot.id;
                docs.push(tempData);
            });
            return {
                status: 1,
                docs: docs
            };
        }
    } catch (error) {
        console.log(`Error at getDocuments --> ${error}`);
        return {
            status: 0,
            docs: []
        };
    }
};

// getDocumentsWithWhere('name', 'Raj', '==')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const updateDocument = async (id, update) => {

    try {
        await userInformation
            .doc(id)
            .set(update, { merge: true });
        return {
            status: 1
        };
    } catch (error) {
        console.log(`Error at updateDocument --> ${error}`);
        return {
            status: 0
        };
    }
};

// updateDocument(
//     'KUWg9TPXX0REEw9cNZgP',
//     {
//         name: 'Rajesh'
//     }
// )
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const deleteDocument = async (id) => {

    try {
        await userInformation
            .doc(id)
            .delete();
        return {
            status: 1
        };
    } catch (error) {
        console.log(`Error at deleteDocument --> ${error}`);
        return {
            status: 0
        };
    }
};

// deleteDocument('KUWg9TPXX0REEw9cNZgP')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


module.exports = {
    createDocument,
    getDocuments,
    getDocumentsWithWhere,
    updateDocument,
    deleteDocument
};