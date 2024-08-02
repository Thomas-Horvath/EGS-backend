# Electric Guitar Shop - Hangszerbolt Webshop BackEnd 

- A project egy hangszer webáruház backendjét valósítja meg.

## Használat:

1. Hozz létre egy mongodb adatbázist három collectionnel:
    - users
    - products 
    - orders

2. teszt adatokat az api mappában találod. A users collectionsbe a usersWithHashedPassword.json fájlt használd.

3. a .env-template fájl nevéből töröld a -template végződést.
4. a .env fájlba generálj egy JWT keyt és add meg a mongodb kapcsolódási linkjét. A port szabadon választható.
5. `npm install` parancsal telepítsd a függőségeket. Így létrejön a node_moduls mappa.
6. `npm run prod` vagy `npm start` parancsokkal indíthatod az alkalmazást 
7. Az api mappában található postmanTest.json fájlt a postmen alkalmazásba beimprortálva tudud tesztelni az alakalmazás útvonalait. 


### Felhasznált technológiák:

- Node.js 
- Express  
- dotenv 
- path
- Jasonwebtoken
- bcrypt
- joi 
- multer






### Az alkalmazásaba útvonali:

        - token nélkül elérhető:
        
            1. /login                   (POST)             
            2. /register                (POST)
            3. /products                (GET)
            4. /product/:id             (GET)

        - vásárlói és admin tokennel is elérhető:

            5. /profile                 (GET)
            6 /profileupdate            (PUT)
            7. /order                   (POST)
            8. /ownorders               (GET)
    

        - Adminiszrátor tokennel elérhető:
        
            9. /adminregister           (POST)
            10. /orders                 (GET)
            11. /order/:id              (GET)
            12. /order/:id              (PUT)
            13. /order/:id              (DELETE)
            14. /user/:id               (GET)
            15. /users                  (GET)
            16. /user/:id               (PUT)
            17. /user/:id               (DELETE)
            18. /newproduct             (POST)
            19. /product/:id            (PUT)
            20. /product/:id            (DELETE)


