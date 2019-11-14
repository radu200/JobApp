import React from "react";
import { removeById } from "./helpers";
import { filterByEmail } from "./helpers";

describe("RemoveById", () => {
  it("should be defined", () => {
    expect(removeById).toBeDefined();
  });

  it("should remove data from array with given id ", () => {
    const payload = [
      {
        id: 1,
        name: "Cat"
      },
      {
        id: 2,
        name: "Dog"
      }
    ];
    const response = [
      {
        id: 1,
        name: "Cat"
      }
    ];

    const id = 2;
    expect(removeById(payload, id)).toEqual(response);
  });

  it("should not remove data from array with given  id  ", () => {
    const payload = [
      {
        id: 1,
        name: "Cat"
      },

      {
        id: 2,
        name: "Dog"
      }
    ];

    const response = [
      {
        id: 1,
        name: "Cat"
      },

      {
        id: 2,
        name: "Dog"
      }
    ];

    const id = 3;
    expect(removeById(payload, id)).toEqual(response);
  });
});


//filter by email

describe("Filter by email", () => {
  it("should be defined", () => {
    expect(filterByEmail).toBeDefined();
  });

  it("should return result by provided email", () => {
    const data = [
      {
        email: "mail@mail.com",
        name: "John Doe"
      },
      {
        email: "mail@mail2.com",
        name: "Mark Doe"
      }
    ];

    const response = [
      {
        email: "mail@mail.com",
        name: "John Doe"
      }
    ];

    const query = "mail@mail.com";

    expect(filterByEmail(data, query)).toEqual(response);
  });
   
  it('should be case sensitive', () => {
    const data = [
        {
            email: "mail@mail.com",
            name: "John Doe"
          }
      ];

      const query = "MAIL@mAIL.com"

      expect(filterByEmail(data, query)).toEqual(data)
  })

  it('should return an empty array when provided wrong email', () => {
    const data = [
        {
            email: "mail@mail.com",
            name: "John Doe"
          }
      ];

      const query = "john@mail.com"
      expect(filterByEmail(data, query)).toEqual([])

  })
});
