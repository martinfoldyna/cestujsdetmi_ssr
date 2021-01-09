export const tinyMCEConfig = {
  apiKey: process.env.NEXT_PUBLIC_TINY_MCE_API_KEY,
  init: {
    height: 500,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
  },
};
