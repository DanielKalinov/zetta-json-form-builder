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
        case "/api/person/name":
          value = faker.person.fullName();
          break;
        case "/api/person/email":
          value = faker.internet.email();
          break;
        case "/api/company/name":
          value = faker.company.name();
          break;
        case "/api/address/street":
          value = faker.location.streetAddress();
          break;
        default:
          value = "Default Mock Value";
      }

      resolve({ value });
    }, 800);
  });
