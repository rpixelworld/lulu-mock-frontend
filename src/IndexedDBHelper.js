import Constants from "./Constants";

let db;
let sampleItem1 = {
  itemKey: "prod10550089_56496_2",
  productId: "prod10550089",
  productName: "Love Long Sleeve Shirt",
  colorAlt: "Pink Peony",
  size: "2",
  imageUrl:
    "http://api-lulu.hibitbyte.com/static/images/productImages/prod10550089/56496/prod10550089_56496_img0.jpg",
  price: 58,
  amount: 2,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
let sampleItem2 = {
  itemKey: "prod10890058_45772_",
  productId: "prod10890058",
  productName: "Curved Wristlet",
  colorAlt: "Brier Rose",
  size: "",
  imageUrl:
    "http://api-lulu.hibitbyte.com/static/images/productImages/prod10890058/45772/prod10890058_45772_img0.jpg",
  price: 48,
  amount: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

let user1 = {
  email: "markxu@itlab.com",
  firstName: "Mark",
  lastName: "Xu",
  addresses: [
    {
      firstName: "Mark",
      lastName: "Xu",
      line1: "Unit #200, 50 Acadia Ave",
      // line2: '',
      city: "Markham",
      countryCode: "CA",
      postalCode: "L3R 0B3",
      phone: "6474017219",
      state: "ON",
    },
    {
      firstName: "Mark",
      lastName: "Xu",
      line1: "33-1489 Heritage Way",
      // line2: '',
      city: "Oakville",
      countryCode: "CA",
      postalCode: "L6M 4M6",
      phone: "2321323123",
      state: "ON",
    },
  ],
};

export const openIndexedDb = () => {
  console.log("openIndexedDb ...", Constants.INDEXED_DB_NAME);
  let req = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  req.onsuccess = function (evt) {
    // Equal to: db = req.result;
    db = this.result;
    console.log("openDb DONE");
  };
  req.onerror = function (evt) {
    console.error("openDb:", evt.target);
  };

  req.onupgradeneeded = function (evt) {
    console.log("openDb.onupgradeneeded");
    try {
      let store = evt.currentTarget.result.createObjectStore(
        Constants.INDEXED_DB_STORE_NAME,
        { keyPath: "itemKey" },
      );

      store.createIndex("productId", "productId", { unique: false });
      store.createIndex("productName", "productName", { unique: false });
      store.createIndex("colorAlt", "colorAlt", { unique: false });
      store.createIndex("size", "size", { unique: false });
      store.createIndex("imageUrl", "imageUrl", { unique: false });
      store.createIndex("price", "price", { unique: false });
      store.createIndex("amount", "amount", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
      store.createIndex("updatedAt", "updatedAt", { unique: false });
    } catch (e) {}

    try {
      let store = evt.currentTarget.result.createObjectStore(
        Constants.INDEXED_DB_USER_STORE_NAME,
        { keyPath: "email" },
      );

      store.createIndex("firstName", "firstName", { unique: false });
      store.createIndex("lastName", "lastName", { unique: false });
      store.createIndex("addresses", "addresses", { unique: false });

      let addReq = store.add(user1);
      addReq.onsuccess = () => {
        console.log("User with email = ", user1.email, "added successfully");
      };
    } catch (e) {}
  };
};

export const insertOrUpdateItem = (key, item, onSuccess, onError) => {
  console.log("insertOrUpdate item from cart", key);
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_STORE_NAME,
      Constants.INDEXED_DB_READWRITE_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

    let getReq = store.get(key);
    getReq.onsuccess = (event) => {
      let record = event.target.result;

      //no found, insert
      if (typeof record == "undefined") {
        let addReq = store.add(item);
        addReq.onsuccess = () => {
          console.log("item inserted successfully", item);
          onSuccess && onSuccess();
        };
        addReq.onerror = () => {
          console.error("item inserted failed", addReq);
          onError && onError();
        };
      }
      //found, update
      else {
        // let newItem = JSON.parse(JSON.stringify(record))
        item.amount = record.amount + item.amount;
        if (item.amount > 5) {
          console.log("amout>5, throw");
          const errorEvent = new Event("error");
          errorEvent.message =
            "Exceeded maximum allowed quantity per line item.";
          errorEvent.name = "ExceedAmountLimit";
          getReq.dispatchEvent(errorEvent);
        } else {
          let updateReq = store.put(item);
          updateReq.onsuccess = (event) => {
            // console.log("evt:", event);
            // console.log("evt.target:", event.target);
            // console.log("evt.target.result:", event.target.result);
            console.log("item updated successful", item);
            onSuccess && onSuccess();
          };
          updateReq.onerror = function (event) {
            console.error("update item failed by ", updateReq);
            onError && onError();
          };
        }
      }
    };
    getReq.onerror = (event) => {
      console.error("insertOrUpdateItem failed", event);
      onError && onError(event);
    };
  };
};

export const deleteItem = (key, onSuccess, onError) => {
  console.log("delete item from cart", key);
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_STORE_NAME,
      Constants.INDEXED_DB_READWRITE_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

    let getReq = store.get(key);
    getReq.onsuccess = (event) => {
      let record = event.target.result;
      console.log("record:", record);
      if (typeof record == "undefined") {
        console.log("no matching record found by ", key);
        onError && onError();
        return;
      }

      let deleteReq = store.delete(key);
      deleteReq.onsuccess = (event) => {
        // console.log("evt:", event);
        // console.log("evt.target:", event.target);
        // console.log("evt.target.result:", event.target.result);
        console.log("item delete successful", key);
        onSuccess && onSuccess();
      };
      deleteReq.onerror = function () {
        console.error("delete item failed by ", key, deleteReq);
        onError && onError();
      };
    };
    getReq.onerror = (event) => {
      console.error("delete item failed by ", key, event.target.errorCode);
      onError && onError();
    };
  };
};

export const updateItem = (key, item, onSuccess, onError) => {
  console.log("update item by ", key, item);
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_STORE_NAME,
      Constants.INDEXED_DB_READWRITE_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

    let getReq = store.get(key);
    getReq.onsuccess = (event) => {
      let record = event.target.result;
      console.log("record:", record);
      if (typeof record == "undefined") {
        console.log("no matching record found by ", key);
        onError && onError();
        return;
      }

      let updateReq = store.put(item);
      updateReq.onsuccess = (event) => {
        // console.log("evt:", event);
        // console.log("evt.target:", event.target);
        // console.log("evt.target.result:", event.target.result);
        console.log("item updated successful", item);
        onSuccess && onSuccess();
      };
      updateReq.onerror = function (event) {
        console.error("update item failed by ", updateReq);
        onError && onError();
      };
    };
    getReq.onerror = (event) => {
      console.error("update item failed by ", getReq);
      onError && onError();
    };
  };
};

export const getAllItems = (onSuccess, onError) => {
  console.log("get total amount in cart");
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_STORE_NAME,
      Constants.INDEXED_DB_READONLY_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

    let getReq = store.getAll();
    getReq.onsuccess = () => {
      const allItems = getReq.result;
      const totalAmount = allItems.reduce((sum, item) => sum + item.amount, 0);
      const totalCost = allItems.reduce(
        (sum, item) => sum + item.amount * item.price,
        0,
      );
      // console.log(allItems)
      onSuccess &&
        onSuccess({
          total: totalAmount,
          totalCost: totalCost,
          items: allItems,
        });
    };
    getReq.onerror = () => [];
  };
  openReq.onerror = () => [];
};

export const clearShoppingCart = (onSuccess, onError) => {
  console.log("clear shopping cart");
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_STORE_NAME,
      Constants.INDEXED_DB_READWRITE_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);
    let clearReq = store.clear();
    clearReq.onsuccess = () => {
      onSuccess && onSuccess();
    };
    clearReq.onerror = () => {
      onError && onError();
    };
  };
};

export const insertOrUpdateUser = (email, user, onSuccess, onError) => {
  console.log("insertOrUpdate user", email);
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_USER_STORE_NAME,
      Constants.INDEXED_DB_READWRITE_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_USER_STORE_NAME);

    let getReq = store.get(email);
    getReq.onsuccess = (event) => {
      let record = event.target.result;

      //no found, insert
      if (typeof record == "undefined") {
        let addReq = store.add(user);
        addReq.onsuccess = () => {
          console.log("user inserted successfully", user);
          onSuccess && onSuccess();
        };
        addReq.onerror = () => {
          console.error("user inserted failed", addReq);
          onError && onError();
        };
      }
      //found, update
      else {
        // let newItem = JSON.parse(JSON.stringify(record))
        let updateReq = store.put(user);
        updateReq.onsuccess = (event) => {
          console.log("user updated successful", user);
          onSuccess && onSuccess();
        };
        updateReq.onerror = function (event) {
          console.error("update user failed by ", updateReq);
          onError && onError();
        };
      }
    };
    getReq.onerror = (event) => {
      console.error("insertOrUpdateUser failed", event);
      onError && onError(event);
    };
  };
};

export const getUser = (email, onSuccess, onError) => {
  console.log("get user by email ", email);
  let openReq = window.indexedDB.open(
    Constants.INDEXED_DB_NAME,
    Constants.INDEXED_DB_VERSION,
  );
  openReq.onsuccess = () => {
    let tx = db.transaction(
      Constants.INDEXED_DB_USER_STORE_NAME,
      Constants.INDEXED_DB_READONLY_MODE,
    );
    let store = tx.objectStore(Constants.INDEXED_DB_USER_STORE_NAME);

    let getReq = store.get(email);
    getReq.onsuccess = (event) => {
      let record = event.target.result;

      //no found
      if (typeof record == "undefined") {
      }
      //found
      else {
        onSuccess(record);
      }
    };
    getReq.onerror = () => [];
  };
  openReq.onerror = () => [];
};

openIndexedDb();
//addItem(sampleItem1)
//addItem(sampleItem2)
