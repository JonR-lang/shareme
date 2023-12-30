export const categories = [
  {
    name: "Cars",
    image:
      "http://images.unsplash.com/photo-1532974297617-c0f05fe48bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8cmVkJTIwY2FyfHwwfHx8fDE2MjkzMDEyNDA&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    name: "Fitness",
    image:
      "https://plus.unsplash.com/premium_photo-1665675240976-54b5cc19d7ff?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Wallpaper",
    image:
      "https://images.unsplash.com/photo-1682905926517-6be3768e29f0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8fDB8fHww",
  },
  {
    name: "Websites",
    image:
      "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Photo",
    image:
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Food",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Nature",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww",
  },
  {
    name: "Travel",
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww",
  },
  {
    name: "Dogs",
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};
export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match "${searchTerm}"  || category match "${searchTerm}" || about match "${searchTerm}*"]{
    image  {
      asset -> {
        url
      }
    }, 
    _id, 
    destination, 
    postedBy -> {
      _id,
      userName, 
      image
    }, 
    save[] {
      _key, 
      postedBy -> {
        _id, 
        userName, 
        image
      },
    },
  }`;

  return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image  {
    asset -> {
      url
    }
  }, 
  _id, 
  destination, 
  postedBy -> {
    _id,
    userName, 
    image
  }, 
  save[] {
    _key, 
    postedBy -> {
      _id, 
      userName, 
      image
    },
  },
}`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title,
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == "${userId}"] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && "${userId}" in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
