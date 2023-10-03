interface Job {
  Role_Listing_ID: number;
  Role_Listing_Name: string;
  Role_Name: string;
  Role_ExpiryDate: DateTime;
  Role_Desc?: string;
  //   Role_Skill: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
