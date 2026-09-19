import { PresetActivity, PresetFood } from '../types';

export const PRESET_FOODS: PresetFood[] = [
  // Meals - อาหารจานเดียวยอดนิยม
  { id: 'f1', name: 'ข้าวกะเพราหมูสับ + ไข่ดาว', nameEn: 'Basil Minced Pork Rice + Fried Egg', calories: 630, protein: 25, carbs: 65, fat: 28, servingUnit: 'จาน', category: 'meal' },
  { id: 'f2', name: 'ข้าวกะเพราอกไก่ (ไม่ใส่ไข่ดาว)', nameEn: 'Basil Chicken Breast Rice', calories: 420, protein: 32, carbs: 58, fat: 6, servingUnit: 'จาน', category: 'clean' },
  { id: 'f3', name: 'ข้าวมันไก่ตอน', nameEn: 'Hainanese Chicken Rice', calories: 590, protein: 26, carbs: 70, fat: 22, servingUnit: 'จาน', category: 'meal' },
  { id: 'f4', name: 'ข้าวมันไก่เนื้ออก (ไม่เอาหนัง)', nameEn: 'Chicken Rice (Skinless Breast)', calories: 460, protein: 34, carbs: 66, fat: 8, servingUnit: 'จาน', category: 'clean' },
  { id: 'f5', name: 'ข้าวผัดหมูใส่ไข่', nameEn: 'Pork Fried Rice with Egg', calories: 550, protein: 20, carbs: 72, fat: 20, servingUnit: 'จาน', category: 'meal' },
  { id: 'f6', name: 'ผัดไทยกุ้งสด', nameEn: 'Pad Thai with Fresh Shrimp', calories: 540, protein: 21, carbs: 66, fat: 21, servingUnit: 'จาน', category: 'meal' },
  { id: 'f7', name: 'ก๋วยเตี๋ยวต้มยำหมูน้ำข้น', nameEn: 'Tom Yum Noodle Soup (Pork)', calories: 480, protein: 20, carbs: 55, fat: 19, servingUnit: 'ชาม', category: 'meal' },
  { id: 'f8', name: 'ก๋วยเตี๋ยวน้ำใสเส้นหมี่ไก่ฉีก', nameEn: 'Rice Vermicelli Clear Soup with Chicken', calories: 310, protein: 24, carbs: 48, fat: 4, servingUnit: 'ชาม', category: 'clean' },
  { id: 'f9', name: 'สุกี้น้ำรวมมิตร (ไม่ใส่วุ้นเส้นเยอะ)', nameEn: 'Thai Suki Soup with Meat & Veggies', calories: 280, protein: 26, carbs: 22, fat: 8, servingUnit: 'ชาม', category: 'clean' },
  { id: 'f10', name: 'ข้าวขาหมูใส่ไข่', nameEn: 'Stewed Pork Leg with Rice & Egg', calories: 690, protein: 24, carbs: 68, fat: 34, servingUnit: 'จาน', category: 'meal' },
  { id: 'f11', name: 'ข้าวหมูกรอบ', nameEn: 'Crispy Pork with Rice', calories: 720, protein: 20, carbs: 70, fat: 38, servingUnit: 'จาน', category: 'meal' },
  { id: 'f12', name: 'ข้าวไข่เจียวหมูสับ', nameEn: 'Minced Pork Omelet Rice', calories: 580, protein: 18, carbs: 54, fat: 32, servingUnit: 'จาน', category: 'meal' },
  { id: 'f13', name: 'ส้มตำไทย', nameEn: 'Som Tum Thai (Green Papaya Salad)', calories: 120, protein: 3, carbs: 26, fat: 1, servingUnit: 'จาน', category: 'clean' },
  { id: 'f14', name: 'ไก่ย่างส่วนอก/น่องสะโพก', nameEn: 'Thai Grilled Chicken (Quarter)', calories: 260, protein: 28, carbs: 2, fat: 14, servingUnit: 'ชิ้น', category: 'clean' },
  { id: 'f15', name: 'ลาบหมู/ไก่', nameEn: 'Spicy Minced Pork/Chicken Salad (Larb)', calories: 210, protein: 22, carbs: 6, fat: 11, servingUnit: 'จาน', category: 'clean' },
  { id: 'f16', name: 'ต้มยำกุ้งน้ำใส', nameEn: 'Tom Yum Kung (Clear Broth)', calories: 120, protein: 18, carbs: 8, fat: 2, servingUnit: 'ถ้วย', category: 'clean' },
  { id: 'f17', name: 'แกงจืดเต้าหู้หมูสับผักกาดขาว', nameEn: 'Clear Tofu & Minced Pork Soup', calories: 160, protein: 16, carbs: 7, fat: 8, servingUnit: 'ถ้วย', category: 'clean' },
  { id: 'f18', name: 'ยำวุ้นเส้นรวมมิตรทะเล', nameEn: 'Spicy Glass Noodle Salad with Seafood', calories: 240, protein: 16, carbs: 36, fat: 4, servingUnit: 'จาน', category: 'meal' },

  // Clean / Fitness Staples
  { id: 'f19', name: 'อกไก่นึ่ง/ย่าง (100 กรัม)', nameEn: 'Cooked Chicken Breast (100g)', calories: 135, protein: 29, carbs: 0, fat: 2.5, servingUnit: '100 กรัม', category: 'clean' },
  { id: 'f20', name: 'ไข่ต้มสุก', nameEn: 'Hard Boiled Egg (1 egg)', calories: 75, protein: 6.3, carbs: 0.6, fat: 5.2, servingUnit: 'ฟอง', category: 'clean' },
  { id: 'f21', name: 'ไข่ดาวทอดน้ำมัน', nameEn: 'Fried Egg (1 egg)', calories: 120, protein: 6.3, carbs: 0.6, fat: 10, servingUnit: 'ฟอง', category: 'meal' },
  { id: 'f22', name: 'ข้าวสวยขาว (1 ทัพพี)', nameEn: 'Cooked White Jasmine Rice (1 ladle / 100g)', calories: 80, protein: 1.5, carbs: 18, fat: 0.2, servingUnit: 'ทัพพี', category: 'meal' },
  { id: 'f23', name: 'ข้าวกล้อง/ไรซ์เบอร์รี่ (1 ทัพพี)', nameEn: 'Brown / Riceberry Rice (1 ladle)', calories: 75, protein: 1.8, carbs: 16, fat: 0.5, servingUnit: 'ทัพพี', category: 'clean' },
  { id: 'f24', name: 'สเต๊กปลาแซลมอนย่าง (150 กรัม)', nameEn: 'Grilled Salmon Fillet (150g)', calories: 310, protein: 32, carbs: 0, fat: 19, servingUnit: 'ชิ้น', category: 'clean' },
  { id: 'f25', name: 'เวย์โปรตีน (1 สกู๊ป ผสมน้ำ)', nameEn: 'Whey Protein Shake (1 scoop)', calories: 125, protein: 25, carbs: 2, fat: 1.5, servingUnit: 'สกู๊ป', category: 'clean' },
  { id: 'f26', name: 'สลัดผักรวมน้ำสลัดงาญี่ปุ่น', nameEn: 'Garden Salad with Sesame Dressing', calories: 150, protein: 3, carbs: 12, fat: 10, servingUnit: 'จาน', category: 'clean' },

  // Drinks - เครื่องดื่ม
  { id: 'f27', name: 'ชานมไข่มุกหวานปกติ', nameEn: 'Bubble Milk Tea (Normal Sweetness)', calories: 360, protein: 2, carbs: 68, fat: 10, servingUnit: 'แก้ว', category: 'drink' },
  { id: 'f28', name: 'กาแฟดำ / อเมริกาโน่ไม่หวาน (0 Cal)', nameEn: 'Iced Americano (No Sugar)', calories: 10, protein: 0.5, carbs: 1.5, fat: 0, servingUnit: 'แก้ว', category: 'drink' },
  { id: 'f29', name: 'ลาเต้เย็นหวานน้อย', nameEn: 'Iced Latte (Less Sweet)', calories: 170, protein: 6, carbs: 20, fat: 7, servingUnit: 'แก้ว', category: 'drink' },
  { id: 'f30', name: 'ชาเขียวมัทฉะลาเต้', nameEn: 'Iced Matcha Latte', calories: 220, protein: 5, carbs: 32, fat: 8, servingUnit: 'แก้ว', category: 'drink' },
  { id: 'f31', name: 'น้ำอัดลมกระป๋อง (325 ml)', nameEn: 'Soft Drink (Can 325ml)', calories: 140, protein: 0, carbs: 36, fat: 0, servingUnit: 'กระป๋อง', category: 'drink' },
  { id: 'f32', name: 'น้ำอัดลมไร้น้ำตาล (0 Kcal)', nameEn: 'Diet / Zero Soda', calories: 2, protein: 0, carbs: 0, fat: 0, servingUnit: 'กระป๋อง', category: 'drink' },
  { id: 'f33', name: 'นมถั่วเหลือง / ไวตามิ้ลค์', nameEn: 'Soy Milk Bottle', calories: 150, protein: 7, carbs: 20, fat: 5, servingUnit: 'ขวด', category: 'drink' },
  { id: 'f34', name: 'น้ำส้มคั้นสด (แก้ว 200 ml)', nameEn: 'Fresh Orange Juice', calories: 95, protein: 1.5, carbs: 21, fat: 0.2, servingUnit: 'แก้ว', category: 'drink' },

  // Snacks & Fruits - ของว่างและผลไม้
  { id: 'f35', name: 'กล้วยหอมทอง (1 ผล)', nameEn: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, servingUnit: 'ลูก', category: 'fruit' },
  { id: 'f36', name: 'แอปเปิ้ล (1 ผลกลาง)', nameEn: 'Apple (1 medium)', calories: 80, protein: 0.4, carbs: 21, fat: 0.2, servingUnit: 'ผล', category: 'fruit' },
  { id: 'f37', name: 'ฝรั่ง (1 ผลกลาง)', nameEn: 'Guava (1 fruit)', calories: 75, protein: 2.5, carbs: 17, fat: 0.8, servingUnit: 'ผล', category: 'fruit' },
  { id: 'f38', name: 'ขนมปังโฮลวีท (1 แผ่น)', nameEn: 'Whole Wheat Bread (1 slice)', calories: 70, protein: 3.5, carbs: 12, fat: 1, servingUnit: 'แผ่น', category: 'snack' },
  { id: 'f39', name: 'ถั่วอัลมอนด์อบ (30 กรัม / 1 กำมือ)', nameEn: 'Roasted Almonds (30g)', calories: 175, protein: 6.2, carbs: 6, fat: 15, servingUnit: 'กำมือ', category: 'snack' },
  { id: 'f40', name: 'โยเกิร์ตรสธรรมชาติไขมัน 0%', nameEn: 'Greek/Plain Low Fat Yogurt (1 cup)', calories: 85, protein: 8, carbs: 10, fat: 0.5, servingUnit: 'ถ้วย', category: 'clean' },
];

export const PRESET_ACTIVITIES: PresetActivity[] = [
  // Cardio
  { id: 'a1', name: 'วิ่งจ็อกกิ้งความเร็วปานกลาง (8 กม./ชม.)', nameEn: 'Jogging (8 km/h)', met: 8.0, category: 'cardio', defaultMinutes: 30 },
  { id: 'a2', name: 'วิ่งเร็วต่อเนื่อง (10-11 กม./ชม.)', nameEn: 'Running (10 km/h)', met: 10.5, category: 'cardio', defaultMinutes: 30 },
  { id: 'a3', name: 'เดินเร็ว / เดินชันบนลู่ (5.5 กม./ชม.)', nameEn: 'Brisk Walking (5.5 km/h)', met: 4.5, category: 'cardio', defaultMinutes: 45 },
  { id: 'a4', name: 'เดินเล่นสบายๆ ทั่วไป', nameEn: 'Casual Walking', met: 3.0, category: 'daily', defaultMinutes: 30 },
  { id: 'a5', name: 'ปั่นจักรยานทั่วไป (ความเร็วกลาง)', nameEn: 'Cycling (Moderate 15-20 km/h)', met: 6.5, category: 'cardio', defaultMinutes: 40 },
  { id: 'a6', name: 'ปั่นจักรยานในฟิตเนส Spin Bike เข้มข้น', nameEn: 'Spinning / Stationary Bike High Intensity', met: 8.5, category: 'cardio', defaultMinutes: 30 },
  { id: 'a7', name: 'ว่ายน้ำท่าฟรีสไตล์ / กบ ปานกลาง', nameEn: 'Swimming (Freestyle/Breaststroke)', met: 7.0, category: 'cardio', defaultMinutes: 30 },
  { id: 'a8', name: 'กระโดดเชือกต่อเนื่อง', nameEn: 'Jump Rope', met: 11.0, category: 'cardio', defaultMinutes: 20 },
  { id: 'a9', name: 'เต้นแอโรบิก / ซุมบ้า (Zumba)', nameEn: 'Aerobic Dance / Zumba', met: 6.5, category: 'cardio', defaultMinutes: 45 },

  // Strength & Fitness
  { id: 'a10', name: 'เวทเทรนนิ่งทั่วไป (พักตามเซ็ต)', nameEn: 'Weight Training (Moderate)', met: 4.5, category: 'strength', defaultMinutes: 45 },
  { id: 'a11', name: 'เวทเทรนนิ่งหนัก / บอดี้เวทเข้มข้น (HIIT / Circuit)', nameEn: 'Heavy Lifting / HIIT Circuit', met: 8.0, category: 'strength', defaultMinutes: 35 },
  { id: 'a12', name: 'โยคะ / ยืดเหยียดกล้ามเนื้อ', nameEn: 'Yoga / Full Body Stretching', met: 2.8, category: 'daily', defaultMinutes: 45 },
  { id: 'a13', name: 'พีลาทิส (Pilates Mat/Reformer)', nameEn: 'Pilates', met: 3.8, category: 'strength', defaultMinutes: 45 },

  // Sports & Games
  { id: 'a14', name: 'ตีแบดมินตัน (เกมแข่งขัน/ซ้อม)', nameEn: 'Badminton', met: 6.0, category: 'sports', defaultMinutes: 60 },
  { id: 'a15', name: 'ฟุตบอล / ฟุตซอล', nameEn: 'Soccer / Futsal', met: 8.5, category: 'sports', defaultMinutes: 60 },
  { id: 'a16', name: 'บาสเก็ตบอล', nameEn: 'Basketball', met: 7.5, category: 'sports', defaultMinutes: 50 },
  { id: 'a17', name: 'เทนนิส (เดี่ยว/คู่)', nameEn: 'Tennis', met: 7.0, category: 'sports', defaultMinutes: 60 },
  { id: 'a18', name: 'ชกมวยสากล / มวยไทย', nameEn: 'Boxing / Muay Thai Training', met: 9.5, category: 'sports', defaultMinutes: 45 },

  // Daily Life
  { id: 'a19', name: 'ทำงานบ้าน (กวาดบ้าน ถูบ้าน ล้างจาน)', nameEn: 'Housework (Sweeping, Mopping)', met: 3.2, category: 'daily', defaultMinutes: 45 },
  { id: 'a20', name: 'เดินขึ้นบันได', nameEn: 'Stair Climbing', met: 8.5, category: 'daily', defaultMinutes: 15 },
];
