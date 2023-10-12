import { Text, Card } from 'react-native-paper';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const LargeCard = ({ item, onPress }) => {
   return (
      <Card style={styles.card}>
         <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
            <Card.Cover source={{ uri: item.coverURL }} style={styles.cardCover} />
            <Card.Content style={styles.cardContent}>
               <Text variant="titleMedium">{item.title}</Text>
               <Text variant="bodyMedium">{item.excerpt}</Text>
            </Card.Content>
         </TouchableOpacity>
      </Card>
   );
};

export default LargeCard;

const styles = StyleSheet.create({
   card: {
      backgroundColor: "#fff",
   },
   cardContent: {
      marginTop: 15,
      marginBottom: 15
   },
   cardCover: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
   }
});