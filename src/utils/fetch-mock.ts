import { faker } from "@faker-js/faker";

export const fetchMock = (endpoint: string) =>
  new Promise<{ value: string }>((resolve) => {
    setTimeout(() => {
      let value: string;

      switch (endpoint) {
        case "/api/user/name":
          value = faker.person.fullName();
          break;
        case "/api/user/email":
          value = faker.internet.email();
          break;
        case "/api/user/address":
          value = faker.location.streetAddress();
          break;
        case "/api/company/name":
          value = faker.company.name();
          break;
        default:
          value = "Default Mock Value";
      }

      resolve({ value });
    }, 500); // simulate network delay
  });
