// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // cabins 
  const mainLodge = await prisma.Cabin.create({
    data: {
      name: 'Main Lodge',
      rooms: {
        create: [
          { name: 'Room 1 – Double', roomType: 'Double', capacity: 2, enSuite: false},
          { name: 'Room 2 – Bunk Room', roomType: 'Bunk', capacity: 4, enSuite: true}
        ]
      }
    },
    include: { rooms: true }
  });
  
  const bunkhouse = await prisma.Cabin.create({
    data: {
      name: 'Bunkhouse',
      rooms: {
        create: [
          { name: 'Room 1 – Twin', roomType: 'Twin', capacity: 2, enSuite: true },
          { name: 'Room 2 – Twin', roomType: 'Twin', capacity: 2, enSuite: true }
        ]
      }
    },
    include: { rooms: true }
  });
  

  // OnSite party with 4 guests
  const smithFamily = await prisma.GuestParty.create({
    data: {
      partyName: 'smith-family',
      token: 'smith-family',
      guestType: 'OnSite',
      inviteCode: '1234',
      fridayParty: true,
      paid: true,
      needsBus: false,
      accommodationCost: 60000,
      cabin: {
        connect: { id: mainLodge.id }
      },
      guests: {
        create: [
          {
            firstName: 'Sarah',
            lastName: 'Smith',
            room: { connect: { id: mainLodge.rooms[0].id } } // Room 1 – Parents
          },
          {
            firstName: 'Ben',
            lastName: 'Smith',
            room: { connect: { id: mainLodge.rooms[0].id } }
          },
          {
            firstName: 'Olivia',
            lastName: 'Smith',
            isChild: true,
            age: 10,
            room: { connect: { id: mainLodge.rooms[1].id } } // Room 2 – Kids
          },
          {
            firstName: 'Leo',
            lastName: 'Smith',
            isChild: true,
            age: 7,
            room: { connect: { id: mainLodge.rooms[1].id } }
          }
        ]
      }
    }
  });  

  const leeFamily = await prisma.GuestParty.create({
    data: {
      partyName: 'lee-family',
      token: 'lee-family',
      guestType: 'OnSite',
      inviteCode: '5678',
      fridayParty: false,
      paid: false,
      needsBus: true,
      accommodationCost: 30000,
      cabin: {
        connect: { id: bunkhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Emma',
            lastName: 'Lee',
            room: { connect: { id: bunkhouse.rooms[0].id } }
          },
          {
            firstName: 'James',
            lastName: 'Lee',
            room: { connect: { id: bunkhouse.rooms[0].id } }
          }
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