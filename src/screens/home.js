// React, Paper and Third-Party Imports
import {
   View,
   Dimensions,
   TouchableOpacity,
   FlatList,
   ScrollView,
} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import SmallCard from "../components/small-card";
import LargeCard from "../components/large-card";

// Contexts, Services and Utilities Imports
import { useAuthentication } from "../contexts/authentication";
import { useContent } from "../contexts/content";

const HomeScreen = ({ navigation }) => {
   // Destructuring values from context hooks.
   const { userInfo } = useAuthentication();
   const { featProfessionals, featArticles } = useContent();

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="headlineSmall">
            Welcome&nbsp;
            <Text variant="headlineSmall" style={{ color: "#7844ac" }}>
               {userInfo.firstName}
            </Text>
         </Text>
         <Text variant="bodyMedium" style={common.mtsm}>
            Explore the Auzy app, your gateway to discovering child mental health
            resources.
         </Text>
         <View style={common.mtxlg}>
            <Text variant="titleMedium">Need an Appointement?</Text>
            <Card style={[common.pmd, common.bgwhite, common.mtmd]}>
               <Text variant="bodyMedium">
                  Need an online appointment? Our professionals are ready
                  to assist you.
               </Text>
               <Button
                  icon={({ size, color }) => (
                     <MaterialIcons
                        name="arrow-forward"
                        size={size}
                        color={color}
                     />
                  )}
                  mode="contained"
                  style={common.mtmd}
                  onPress={() => navigation.navigate("ProfessionalsTab")}
               >
                  Book appointement
               </Button>
            </Card>
         </View>
         <View style={common.mtxlg}>
            <View style={common.redge}>
               <Text variant="titleMedium">Featured Professionals</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("ProfessionalsTab")}
               >
                  <MaterialCommunityIcons
                     size={24}
                     style={common.purple}
                     name="dots-horizontal"
                  />
               </TouchableOpacity>
            </View>
            <FlatList
               horizontal
               data={featProfessionals}
               keyExtractor={(item) => item.businessId}
               renderItem={({ item }) => (
                  <View style={[common.mrmd, common.mtnr]}>
                     <SmallCard
                        item={item}
                        onPress={(item) => navigation.navigate("Professional", item)}
                     />
                  </View>
               )}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={[common.mtsm, common.plnr, common.pbnr]}
            />
         </View>
         <View style={common.mtxlg}>
            <View style={common.redge}>
               <Text variant="titleMedium">Featured Articles</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("ArticlesTab")}
               >
                  <MaterialCommunityIcons
                     size={24}
                     style={common.purple}
                     name="dots-horizontal"
                  />
               </TouchableOpacity>
            </View>
            <FlatList
               horizontal
               data={featArticles}
               keyExtractor={(item) => item.postId}
               renderItem={({ item }) => (
                  <View
                     style={[
                        common.mrmd,
                        common.mtnr,
                        { width: Dimensions.get("window").width - 80 },
                     ]}
                  >
                     <LargeCard
                        item={item}
                        onPress={(item) => navigation.navigate("Article", item)}
                     />
                  </View>
               )}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={[common.mtsm, common.plnr, common.pbnr]}
            />
         </View>
      </ScrollView>
   );
};


export default HomeScreen;
