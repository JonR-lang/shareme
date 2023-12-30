export default {
  name: 'postedBy',
  title: 'PostedBy',
  type: 'reference',
  to: [{type: 'user'}],
  fields: [
    {
      name: 'userName',
      type: 'string',
      title: 'User Name',
      to: [{type: 'user.userName'}], // Define the reference to user's userName
    },
    {
      name: 'image',
      type: 'string',
      title: 'Image',
      to: [{type: 'user.image'}], // Define the reference to user's image
    },
  ],
}
