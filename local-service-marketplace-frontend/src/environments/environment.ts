export const environment = {
    keycloak:{
        issuer:"http://localhost:8080/realms/local-service-market-place",
        redirectUri:"http://localhost:4200/",
        clientId: "market-place-frontend",
        scope:"openid profile email offline_access"
    }
};
