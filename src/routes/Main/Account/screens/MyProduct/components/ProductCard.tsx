import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomIcons} from '../../../../../../components';

const ProductCard = ({
  product,
  onPress,
  onEdit,
  onDelete,
}: {
  product: any;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <View style={{flex: 1}}>
            <Text style={styles.productName} numberOfLines={1}>
              {product.productName}
            </Text>
            <Text style={styles.category}>{product.categoryName}</Text>
          </View>

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <CustomIcons
                name="edit"
                type="AntDesign"
                size={22}
                color="#000"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
              <CustomIcons
                name="trash-outline"
                type="Ionicons"
                size={22}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Price and Tax */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹ {product.productPrice.toFixed(2)}</Text>
          <Text style={styles.tax}>Tax: ₹ {product.tax.toFixed(2)}</Text>
        </View>

        {/* Product Code and Dimensions */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Code: {product.productCode}</Text>
          <Text style={styles.detailText}>
            Dimensions: {product.l} x {product.b} x {product.h} cm
          </Text>
          <Text style={styles.detailText}>Volume: {product.volume}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  tax: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});

export default ProductCard;
