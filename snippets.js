const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost', (connErr, db) => {
  if (connErr) {
    console.error(connErr);
    db.close();
    return;
  }

  const collection = db.collection('snippets');

  const create = (name, content) => {
    const snippet = {
      name,
      content,
    };
    collection.insert(snippet, (err, result) => {
      if (err) {
        console.error('Could not create snippet', name);
        db.close();
        return;
      }
      console.log('Created snippet', name);
      db.close();
    });
    db.close();
  };

  const read = (name) => {
    const query = { name };
    collection.findOne(query, (err, snippet) => {
      if (!snippet || err) {
        console.error('Could not read snippet', name);
        db.close();
        return;
      }
      console.log('Read snippet', snippet.name);
      console.log(snippet.content);
      db.close();
    });
    db.close();
  };

  const update = (name, content) => {
    db.close();
  };

  const del = (name, content) => {
    db.close();
  };

  const main = () => {
    if (process.argv[2] === 'create') {
      create(process.argv[3], process.argv[4]);
    } else if (process.argv[2] === 'read') {
      read(process.argv[3]);
    } else if (process.argv[2] === 'update') {
      update(process.argv[3], process.argv[4]);
    } else if (process.argv[2] === 'delete') {
      del(process.argv[3]);
    } else {
      console.error('Command not recognized');
      db.close();
    }
  };

  main();
});
