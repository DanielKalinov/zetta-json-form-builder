import { faker } from "@faker-js/faker";

export const fetchMock = (endpoint: string) =>
  new Promise<{ value: string }>((resolve) => {
    setTimeout(() => {
      let value: string;

      switch (endpoint) {
        case "/api/geo/cities":
          value = faker.location.city();
          break;
        case "/api/geo/countries":
          value = faker.location.country();
          break;
        case "/api/geo/state":
          value = faker.location.state();
          break;
        case "/api/geo/zipcode":
          value = faker.location.zipCode();
          break;
        case "/api/person/name":
          value = faker.person.fullName();
          break;
        case "/api/person/email":
          value = faker.internet.email();
          break;
        case "/api/person/phone":
          value = faker.phone.number();
          break;
        case "/api/person/jobTitle":
          value = faker.person.jobTitle();
          break;
        case "/api/company/name":
          value = faker.company.name();
          break;
        case "/api/company/catchPhrase":
          value = faker.company.catchPhrase();
          break;
        case "/api/address/street":
          value = faker.location.streetAddress();
          break;
        case "/api/address/fullAddress":
          value = faker.location.streetAddress() + ", " + faker.location.city();
          break;
        case "/api/internet/username":
          value = faker.internet.username();
          break;
        case "/api/internet/url":
          value = faker.internet.url();
          break;
        default:
          value = "Default Mock Value";
      }

      resolve({ value });
    }, 800);
  });
