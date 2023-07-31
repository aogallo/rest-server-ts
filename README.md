# rest-server-ts

This project is in charge to manager all the request from the management system dentist

You need to configure the following env variables:

* PORT -> It's mean the port where the application will receive all requests
* MONGO_URI -> Mongo URL to connect
* USER_MONGO -> User to connect to mongo database
* PASSWORD_MONGO -> Password user

## Available scripts

### `yarn dev`
Run the server locally

### `yarn build`
Create the bundle for producction

### `yarn start`
Start the server for producction

### `yarn lint`
RUn eslint to check the code

## Configure custom paths

* Add the custom path to the tsconfig configuration
Example:
```json
{
    "paths": {
        "<custom_path_name/*": ["<path>/*"]
    }
}

```

* Add the custom path to the babel configuration
Example:
```json
{
    "alias": {
      "@controllers": "./src/controllers",
    }
}

```

* Add the custom path to the eslint configuration
Example:

```json
"map": [
  [
    "@routes",
    "./src/routes"
  ],
```
