# Electric Guitar Shop - Hangszerbolt Webshop BackEnd 

- A project egy hangszer webáruház backendjét valósítja meg 

## Felhasznált technológiák:
1. Node.js 
    - Express szerver 
    - dotenv 
    - path
    - Jasonwebtoken
    - bcrypt


2. MongoDB adatbázis szerver
    Az adatbázis 3 collectiont tartalmaz:
        - Users
        - Products
        - Orders 
    Tartalmuk az api mappában json fájlokban megtekinthető. 


- Az alkalmazásaba két fő útvonal érhető el:

     - a / útvonal tartalmazza a token nélkül elérhető publikus útvonalakat:

        1. /login    (POST)
        2. /register  (POST)
        3. /products  (GET)
        4. /product/:id    (GET)

    - a /private útvonal a bejelentkezéshez kötött. 
        - vásárlói tokennel elérhető:

            1. /profile   (GET)
            2. /profileupdate  (PUT)
            3. /order   (POST)

        - Adminiszrátor tokennel:
        
            1. /profile   (GET)
            2. /profileupdate  (PUT)
            3. /order   (POST) 
            +
            4. /adminregister  (POST)
            5. /orders    (GET)
            6. /order/:id  (GET)
            7. /order/:id  (PUT)
            8. /order/:id  (DELETE)
            9. /user/:id    (GET)
            10. /users      (GET)
            11. /user/:id   (PUT)
            12. /user/:id   (DELETE)
            13. /newproduct   (POST)
            14. /product/:id  (PUT)
            15. /product/:id   (DELETE)


- Postman-nel az összes útvonal tesztelve!
