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
  };

  const update = (name, content) => {
    const query = { name };
    const update = {
      $set: { content },
    };

    collection.findAndModify(query, null, update, (err, result) => {
      const snippet = result.value;
      if (!snippet || err) {
        console.error('Could not update snippet', name);
        db.close();
        return;
      }
      console.log('Updated snippet', snippet.name);
      db.close();
    });
  };

  const del = (name, content) => {
    const query = { name };
    collection.findAndRemove(query, (err, result) => {
      const snippet = result.value;
      if (!snippet || err) {
        console.error('Could not delete snippet', name);
        db.close();
        return;
      }
      console.log('Deleted snippet', snippet.name);
      db.close();
    });
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
