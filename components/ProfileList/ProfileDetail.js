import React from "react";
import { observer } from "mobx-react";
import {
  ListItem,
  Right,
  Left,
  List,
  Text,
  Button,
  Content,
  Thumbnail,
} from "native-base";
import defaultimage from "../../assets/defaultimage.png";
import { BlackTitle } from "./styles";
import DiscoverItem from "../DiscoverList/DiscoverItem";
import { UpdateButtonStyled } from "../../styles";
import tripStore from "../../stores/TripStore";
import authStore from "../../stores/AuthStore";
const ProfileDetail = ({ route, navigation }) => {
  if (tripStore.loading) return <Spinner />;

  const { profile } = route.params;

  const profileTripList = tripStore.trips
    .filter((trip) => trip.userId === profile.userId)
    .map((trip) => (
      <DiscoverItem trip={trip} key={trip.id} navigation={navigation} />
    ));

  return (
    <Content>
      <ListItem thumbnail>
        {/* <BlackTitle>{user.username}</BlackTitle> */}
        <Thumbnail
          source={profile.image ? { uri: profile.image } : defaultimage}
        />
        <BlackTitle>{profile.bio}</BlackTitle>
      </ListItem>

      <Button
        onPress={() =>
          navigation.navigate("EditProfileForm", { oldProfile: profile })
        }
      >
        <Text> Edit Profile</Text>
      </Button>
      <List>{profileTripList}</List>
    </Content>
  );
};

export default observer(ProfileDetail);
