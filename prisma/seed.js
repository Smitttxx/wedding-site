// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // OnSite party with 2 guests
  const mariaAndDougie = await prisma.guestParty.create({
    data: {
      partyName: 'maria-and-dougie',
      token: 'maria-and-dougie',
      guestType: 'OnSite',
      inviteCode: '1234',
      roomInfo: 'Garden Cabin 🌲 – 2 nights stay',
      fridayParty: true,
      paid: false,
      needsBus: false,
      accommodationCost: 30000,
      guests: {
        create: [
          { firstName: 'Maria', lastName: 'Smith', dietary: 'Vegetarian' },
          { firstName: 'Dougie', lastName: 'Smith' }
        ]
      }
    }
  });

  // Other Accommodation with bus needed, 3 guests
  const evieRoryMila = await prisma.guestParty.create({
    data: {
      partyName: 'evie-rory-mila',
      token: 'evie-rory-mila',
      guestType: 'OtherAccommodation',
      inviteCode: '1234',
      fridayParty: true,
      paid: false,
      needsBus: true,
      accommodationCost: null,
      guests: {
        create: [
          { firstName: 'Evie', lastName: 'Jones', dietary: 'Gluten-free' },
          { firstName: 'Rory', lastName: 'Jones' },
          { firstName: 'Mila', lastName: 'Jones', isChild: true, age: 6 }
        ]
      }
    }
  });

  // Day & Evening guest, 1 guest
  const tom = await prisma.guestParty.create({
    data: {
      partyName: 'tom-hughes',
      token: 'tom-hughes',
      guestType: 'DayEveningOnly',
      inviteCode: '1234',
      fridayParty: false,
      paid: false,
      needsBus: false,
      accommodationCost: null,
      guests: {
        create: [
          { firstName: 'Tom', lastName: 'Hughes' }
        ]
      }
    }
  });

  // OnSite party, already paid, 4 guests
  const smithFamily = await prisma.guestParty.create({
    data: {
      partyName: 'smith-family',
      token: 'smith-family',
      guestType: 'OnSite',
      inviteCode: '1234',
      roomInfo: 'Main Lodge – Family Suite',
      fridayParty: true,
      paid: true,
      needsBus: false,
      accommodationCost: 60000,
      guests: {
        create: [
          { firstName: 'Sarah', lastName: 'Smith' },
          { firstName: 'Ben', lastName: 'Smith' },
          { firstName: 'Olivia', lastName: 'Smith', isChild: true, age: 10 },
          { firstName: 'Leo', lastName: 'Smith', isChild: true, age: 7 }
        ]
      }
    }
  });

  console.log('🌱 Seeded GuestParties and IndividualGuests');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });