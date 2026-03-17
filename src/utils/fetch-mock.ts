import { faker } from "@faker-js/faker";

export const fetchMock = (endpoint: string, params?: Record<string, any>) =>
  new Promise<{ value: string }>((resolve) => {
    setTimeout(() => {
      let value: string;

      switch (endpoint) {
        case "/api/geo/states":
          // Requirement: Triggered when 'country' changes
          const country = params?.country || "the selected country";
          value = `State in ${country}`;
          break;

        case "/api/geo/cities":
          // Requirement: Triggered when 'state' and 'zipCode' change
          value = faker.location.city();
          break;

        case "/api/shipping/tax-rate":
          // Requirement: Triggered by zipCode
          value = `${faker.number.int({ min: 5, max: 15 })}%`;
          break;

        case "/api/company/details":
          // Requirement: Triggered by taxId or companyName
          value = faker.company.catchPhrase();
          break;

        default:
          value = "Default Mock Value";
      }

      resolve({ value });
    }, 800);
  });
