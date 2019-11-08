Components:
About - About this app page.
Header - Header of the app.
Footer - Footer of the app.
Home - main home page.
LoginForm - login page.
RegisterForm - Register page.
GiftList - This is the list of gift lists.
GiftListDetails - This is the details of a gift list.
CreateGiftListForm - Create a new Gift list.
UpdateGiftListForm - update a gift list.
GiftDetails - Details of a gift.
CreateGift - creates a new gift.
UpdateGift - edits a Gift.

Routes:
/giftlists - get all
/giftlists/:id - create, update, delete
/giftlists/:id/gifts - get gifts by giftlist
/giftlists/:giftListId/gifts/:giftId - create, update and delete gift(giftListId is irrelevant for update and delete)

Models:
User
GiftList
Gift


