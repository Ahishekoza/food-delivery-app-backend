import { Restaurant } from "../models/restaurantOwner.model.js";

export const searchRestaurants = async (req, res) => {
  // receieve the parameters of the city
  // check whether there are any restaurants presents in the city
  // if not then return the response with empty array
  // if present then create a object of the query
  // and start adding the parameters like cuisines, sort and search
  // after that proceed with pagination
  // pass a query object to the backend
  //  fetch the results and return the response

  try {
    const { city } = req.params;

    //   object query will contain all the search parameters
    const query = {};
    query.city = new RegExp(city, "i");

    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(200).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    const searchQuery = (req.query.searchQuery || "").trim();
    const selectedCuisines = req.query.selectedCuisines || "";
    const sortOption = req.query.sortOption || "updatedAt";
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    if (selectedCuisines) {
      // cuisines pasta,pizza,burger
      // [pasta,pizza,burger]
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query.cuisines = { $all: cuisineArray };
    }

    if (searchQuery) {
      // suppose user searches something in the search bar
      query.$or = [
        { restaurantName: new RegExp(searchQuery, "i") },
        { cuisines: { $in: [new RegExp(searchQuery, "i")] } },
      ];
    }


    const restaurants = await Restaurant.aggregate(
      [
        {
          $match: query,
        },
        {
          $sort: { [sortOption]: 1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        }
      ]
    );

    const total = await Restaurant.countDocuments(query);
    console.log(total);
    
    return res.status(200).json({
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
