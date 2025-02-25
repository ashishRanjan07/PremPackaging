import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Colors';
import Header from '../General/Header';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import PopularProducts from './popularProducts';
import FontFamily from '../../utils/FontFamily';
import {textScale} from '../../utils/ResponsiveSize';

const CategoryDetailsTwo = ({route}) => {
  const [sortedData, setSortedData] = useState(route.params.data);
  const {categories, data, option} = route.params;
  console.log(categories, 'Line 11');
  const staticImageURL = 'https://picsum.photos/300';
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sorting function

  const handleFilterBySize = (length, width, height) => {
    // If length, width, and height are Infinity, reset to show all products
    if (length === Infinity && width === Infinity && height === Infinity) {
      setSortedData(data); // Reset to show all products
      return;
    }

    const parseSize = sizeString => {
      const [l, w, h] = sizeString.split('x').map(parseFloat);
      return {length: l, width: w, height: h};
    };

    const filteredProducts = data.filter(product => {
      const {
        length: prodLength,
        width: prodWidth,
        height: prodHeight,
      } = parseSize(product.size_inch);
      return prodLength <= length && prodWidth <= width && prodHeight <= height;
    });

    setSortedData(filteredProducts); // Update the filtered product list
  };

  const handleSort = option => {
    let sortedArray = [...data];

    switch (option) {
      case 'highToLow':
        sortedArray.sort((a, b) => b.priceList[0]?.SP - a.priceList[0]?.SP);
        break;
      case 'lowToHigh':
        sortedArray.sort((a, b) => a.priceList[0]?.SP - b.priceList[0]?.SP);
        break;
      default:
        sortedArray = data; // Default sorting
    }
    setSortedData(sortedArray); // Update the sorted data
  };

  const handleFilterByCategory = selectedCategories => {
    console.log(selectedCategories, 'Line 58');
    if (selectedCategories.length === 0) {
      setSortedData(data);
    } else {
      const filtered = data.filter(product => {
        return Object.values(product).some(value => {
          if (Array.isArray(value)) {
            return value.some(val => selectedCategories.includes(val));
          } else if (typeof value === 'object' && value !== null) {
            return Object.values(value).some(val =>
              selectedCategories.includes(val),
            );
          } else {
            return selectedCategories.includes(value);
          }
        });
      });
      setSortedData(filtered);
    }
  };

  const handleFilterByBrand = selectedBrandIds => {
    // console.log(selectedBrandIds, "line 70");
    if (selectedBrandIds.length === 0) {
      setSortedData(data);
    } else {
      const filtered = data.filter(product => {
        return Object.values(product).some(value => {
          if (Array.isArray(value)) {
            return value.some(val => selectedBrandIds.includes(val));
          } else if (typeof value === 'object' && value !== null) {
            return Object.values(value).some(val =>
              selectedBrandIds.includes(val),
            );
          } else {
            return selectedBrandIds.includes(value);
          }
        });
      });
      setSortedData(filtered);
    }
  };
  const renderBrandMessage = () => {
    if (categories?.brandId === '6582c8580ab82549a084894f') {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.Montserrat_Bold,
              fontSize: textScale(15),
              color: '#3a5ba2',
              textAlign: 'center',
              width:'90%',
              alignSelf:'center'
            }}>
            We are authorized manufacturers of Ajio polybags. For further
            purchases, please contact through the official Reliance channel.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Colors.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header
        // title={categories?.name}
        title={
          categories?.name
            ? categories.name.charAt(0).toUpperCase() + categories.name.slice(1)
            : ''
        }
        onSort={handleSort}
        onFilterBySize={handleFilterBySize}
        option={option}
        onFilterByCategory={handleFilterByCategory}
        onFilterByBrand={handleFilterByBrand}
        categories={categories}
      />
      {categories?.brandId === '6582c8580ab82549a084894f' ? (
        renderBrandMessage()
      ) : (
        <View style={styles.productHolder}>
          {sortedData?.length > 0 ? (
            <PopularProducts data={sortedData} />
          ) : (
            <View style={styles.noProductContainer}>
              <Text style={styles.nameText}>No Products Found</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CategoryDetailsTwo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  productHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveFontSize(15),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.back,
    width: '100%',
    flex: 1,
  },
  noProductContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    textAlign: 'center',
  },
});
