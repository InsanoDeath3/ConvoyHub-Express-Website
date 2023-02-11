const fs = require("fs")

function adaptersget(db) {
    if (!db) {
        throw new TypeError(this.message["errors"]["blankName"]);
    }

    var content = JSON.parse(fs.readFileSync(`../hub/croxydb/croxydb.json`, "utf8"));

    try {
        return functionsget(content, ...db.split("."));
    } catch (err) {
        return undefined;
    }
}

function adaptersset(db, data) {
    if (!db) {
        throw new TypeError(this.message["errors"]["blankName"]);
    }

    if (!data) {
        throw new TypeError(this.message["errors"]["blankData"]);
    }

    var content = JSON.parse(fs.readFileSync(`../hub/croxydb/croxydb.json`, "utf8"));
    functionsset(db, data, content);

    fs.writeFileSync(`../hub/croxydb/croxydb.json`, JSON.stringify(content));
}

function functionsget(obj, ...data) {
    return data.reduce(function (acc, key) {
        return acc[`${key}`];
    }, obj);
}

function functionsset(path, value, obj) {
    var schema = obj;
    var pList = path.split(".");
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[`${i}`];
        if (typeof schema[`${elem}`] !== "object") {
            schema[`${elem}`] = {};
        }
        schema = schema[`${elem}`];
    }
    schema[pList[`${len - 1}`]] = value;
};

module.exports = {
    get(db) {
        if (!db) {
            console.log("Cannot get Empty Data")
        }

        try {
            return adaptersget(db);
        } catch (err) {
            return undefined;
        }

    },

    set(db, data) {
        if (!db) {
            console.log("Cannot get Empty Data File")
        }

        if (!data) {
            console.log("Cannot set Empty Data")
        }

        return adaptersset(db, data);
    }
}