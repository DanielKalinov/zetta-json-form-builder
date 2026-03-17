import { faker } from "@faker-js/faker";

export const fetchMock = (endpoint: string, params?: Record<string, any>) =>
  new Promise<{ value: string }>((resolve) => {
    setTimeout(() => {
      let value: string;

      switch (endpoint) {
        case "/api/geo/states":
          const country = params?.country || "the selected country";
          value = `State in ${country}`;
          break;

        case "/api/geo/cities":
          value = faker.location.city();
          break;

        case "/api/shipping/tax-rate":
          value = `${faker.number.int({ min: 5, max: 15 })}%`;
          break;

        case "/api/company/details":
          value = faker.company.catchPhrase();
          break;

        default:
          value = "Default Mock Value";
      }

      resolve({ value });
    }, 800);
  });
