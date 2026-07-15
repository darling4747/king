export const MOCK_USERS = [
  {
    id: '1',
    name: 'Siddharth Roy',
    phone: '9876543210',
    email: 'siddharth.roy@gmail.com',
    joining_date: '2025-10-12',
    inactive_on: '2026-02-15',
    status: 'Placed',
    message: 'Completed Full Stack Java training. Successfully placed at Tech Mahindra as a Software Engineer.'
  },
  {
    id: '2',
    name: 'Priyanka Sharma',
    phone: '8765432109',
    email: 'priyanka.sharma@yahoo.com',
    joining_date: '2025-11-01',
    inactive_on: '2026-03-01',
    status: 'Placed',
    message: 'Completed QA Automation training. Successfully placed at Capgemini as an Automation Engineer.'
  },
  {
    id: '3',
    name: 'Rohan Deshmukh',
    phone: '7654321098',
    email: 'rohan.desh@gmail.com',
    joining_date: '2026-01-15',
    inactive_on: null,
    status: 'Active',
    message: 'Currently undergoing React and Frontend Engineering training. Doing well in mock interviews.'
  },
  {
    id: '4',
    name: 'Meera Nair',
    phone: '6543210987',
    email: 'meera.nair@outlook.com',
    joining_date: '2026-03-10',
    inactive_on: null,
    status: 'Active',
    message: 'Enrolled in Core Java and database fundamentals. Active candidate progressing through projects.'
  },
  {
    id: '5',
    name: 'Amit Patel',
    phone: '5432109876',
    email: 'amit.patel@gmail.com',
    joining_date: '2025-08-20',
    inactive_on: '2025-12-05',
    status: 'Inactive',
    message: 'Profile deactivated. Opted out of placements due to higher education plans.'
  },
  {
    id: '6',
    name: 'Anjali Sen',
    phone: '4321098765',
    email: 'anjali.sen@gmail.com',
    joining_date: '2026-02-01',
    inactive_on: null,
    status: 'On Hold',
    message: 'Internship completed. Placements currently on hold due to personal medical leave.'
  }
];

export const lookupUser = (phone) => {
  const cleanPhone = phone.trim().replace(/\D/g, ''); // strip non-digits
  return MOCK_USERS.find(user => user.phone === cleanPhone || user.phone.includes(cleanPhone));
};
