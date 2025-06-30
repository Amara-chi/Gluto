import { connectDB } from './db';
import { User } from './models';
import bcrypt from 'bcryptjs';

const seedAdmin = async () => {
  await connectDB();
  
  const adminEmail = 'admin@example.com';
  const adminPassword = 'securepassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    email: adminEmail,
    passwordHash: hashedPassword,
    isAdmin: true,
    firstName: 'Admin',
    lastName: 'User'
  });

  console.log('Admin user created:');
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  process.exit(0);
};

seedAdmin().catch(console.error);