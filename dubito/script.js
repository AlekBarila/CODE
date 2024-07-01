class Marketplace {
  users = [];
  ads = [];
  reviews = [];
  auth = [];

  register(email, password) {
    function OnFind(user) {
      if (user.email == email) {
        return true;
      }
      return false;
    }
    const user = this.users.find(OnFind);
    if (!!user) {
      console.log("utente già registrato");
    } else {
      let newUser = new User(email, password);
      this.users = [...this.users, newUser];
    }
  }
  login(email, password) {
    function OnFind(user) {
      if (user.email == email && user.password == password) {
        return true;
      }
      return false;
    }
    const userFound = this.users.find(OnFind);

    if (!!userFound) {
      if (userFound.devices.length < 2) {
        const authFound = this.getAuthByUserID(userFound.primaryKey);
        if (!!authFound) {
          console.log("Gia' autenticato");
        } else {
          const newAuth = new Auth(userFound.primaryKey);
          this.auth = [...this.auth, newAuth];
          return newAuth.getToken();
        }
      } else {
        console.log("Troppi devices");
      }
    } else {
      console.log("email/password sbagliati");
    }
  }

  logout(token) {
    const authFound = this.getAuthByToken(token);

    if (!!authFound) {
      this.auth = this.auth.filter(function () {
        if (authFound.getToken() == token) {
          return false;
        }
        return true;
      });
      console.log("Logout effettuato con successo");
    } else {
      console.log("token non valido");
    }
  }

  createAd(
    primaryKeyAd,
    title,
    description,
    price,
    status,
    category,
    phone,
    urlForImage,
    token
  ) {}

  editAd(
    primaryKeyAd,
    title,
    description,
    price,
    status,
    category,
    phone,
    urlForImage,
    token
  ) {}

  deleteAd(primaryKeyAd, token) {}

  addReview(title, description, rating, referenceKeyAds, token) {}

  editReview(primaryKeyReview, title, description, rating, token) {}

  deleteReview(primaryKeyReview, token) {}

  deleteAccount(token, password) {}

  editUsername(newUsername, token) {}
  markSold(primaryKeyAd, token, referenceKeyUserPuchased) {
    const auth = this.getAuthByToken(token);
    if (!!auth) {
      function OnFind(ad) {
        if (ad.primaryKey == primaryKeyAd) {
          return true;
        }
        return false;
      }
      const adFound = this.ads.find(OnFind);
      if (!!adFound) {
        if (adFound.referenceKeyUser == auth.referenceKeyUser) {
          if (!adFound.referenceKeyUserPuchased) {
            this.ads = this.ads.map(function (ad) {
              if (ad.primaryKey == primaryKeyAd) {
                return {
                  ...ad,
                  referenceKeyUserPuchased: referenceKeyUserPuchased,
                };
              }
              return { ...ad };
            });
            console.log("Annuncio modificato");
          } else {
            console.log("Annuncio già venduto");
          }
        } else {
          console.log("Operazione non autorizzata.");
        }
      } else {
        console.log("Annuncio invalido");
      }
    } else {
      console.log("token non valido");
    }
  }

  listFiltred(prezzo, categoria, data, meters) {}
  adDetails(primaryKeyAd) {}
  listAdsSold(token) {}

  listAdsPurchased(token) {}

  listFavourites(token) {}

  addFavourite(primaryKeyAd, token) {}

  removeFavourite(primaryKeyAd, token) {}
  getPhoneNumber(token, referenceKeyAd) {}
  getInterestedUsersOfAd() {}
  getListOfPendingPurchasesToBeConfirmedOfUser(token) {}
  markBought(token, referenceKeyAd) {}
  registerDevice(id, token, name) {
    const auth = this.getAuthByToken(token);
    const user = this.getUserbyUserID(auth.referenceKeyUser);
    user.devices = [...user.devices, new Device(user.primaryKey, name, id)];
  }

  getAuthByToken(token) {
    return this.auth.find(function (auth) {
      if (auth.getToken() == token) {
        return true;
      }
      return false;
    });
  }
  getAuthByUserID(id) {
    return this.auth.find(function (auth) {
      {
        if (auth.referenceKeyUser == id) {
          return true;
        }
        return false;
      }
    });
  }
  getUserbyUserID(id) {
    function OnFind(user) {
      if (user.primaryKey == id) {
        return true;
      }
      return false;
    }
    return this.users.find(OnFind);
  }
}

class User {
  constructor(email, password) {
    this.username = email.split("@").at(0);
    this.email = email;
    this.password = password;
    this.primaryKey = Math.random();
    this.devices = [];
  }
}

class Ads {
  constructor(
    title,
    description,
    price,
    status,
    referenceKeyUser,
    category,
    phone,
    urlForImage
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.date = new Date();
    this.status = status;
    this.referenceKeyUser = referenceKeyUser;
    this.category = category;
    this.primaryKey = Math.random();
    this.phone = phone;
    this.lead = [];
    this.urlForImage = urlForImage;
    this.referenceKeyUserPuchased = undefined;
  }
}

class Review {
  constructor(referenceKeyUser, title, description, rating, referenceKeyAds) {
    this.referenceKeyUser = referenceKeyUser;
    this.time = new Date();
    this.description = description;
    this.rating = rating;
    this.title = title;
    this.referenceKeyAds = referenceKeyAds;
    this.primaryKey = Math.random();
  }
}

class Auth {
  constructor(referenceKeyUser) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.token = Math.random() * 10000000;
  }
  getToken() {
    return this.token;
  }
}

class Reports {
  constructor(referenceKeyAds, referenceKeyUser) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.description = description;
    this.status = false;
  }
}

class Favourite {
  constructor() {
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAds = referenceKeyAds;
    this.primaryKey = Math.random();
  }
}
class Device {
  constructor(referenceKeyUser, name, id) {
    this.primaryKey = Math.random();
    this.id = id;
    this.referenceKeyUser = referenceKeyUser;
    this.name = name;
  }
}
