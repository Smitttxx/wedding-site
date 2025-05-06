// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


function calculateBookingFee(baseCost) {
  return Math.round(baseCost * 0.015 + 20);
}

async function main() {

  // cabins 
  const farmhouse = await prisma.Cabin.create({
    data: {
      name: 'Farmhouse',
      videoUrl: 'https://youtube.com/embed/kFmoTPF2UEQ',
      imageFileName: 'farmhouse.jpg',
      capacity: 18, 
      roomCount: 6, 
      hotTub: "Yes",
      checkIn: "4pm",
      checkOut: "11am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 4', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 5', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 6', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const longhouse = await prisma.Cabin.create({
    data: {
      name: 'Longhouse',
      videoUrl: "https://youtube.com/embed/AGobMia64XM",
      imageFileName: 'longhouse.jpg',
      capacity: 8,
      roomCount: 4,
      hotTub: "Heated on request — advance notice required",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double/twin', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const benCruachan = await prisma.Cabin.create({
    data: {
      name: 'Ben Cruachan',
      videoUrl: "https://www.youtube.com/embed/QZ5_lcqw9ww",
      imageFileName: 'benCruachan.jpg',
      capacity: 10,
      roomCount: 4,
      hotTub: "Heated on request — advance notice required",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double/Twin And Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const schiehallion = await prisma.Cabin.create({
    data: {
      name: 'Schiehallion',
      videoUrl: "https://youtube.com/embed/5v5DUIyRBNk",
      imageFileName: 'schiehallion.jpg',
      capacity: 10, 
      roomCount: 4,
      hotTub: "Heated on request — advance notice required",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/Twin And Bunk', capacity: 4, enSuite: false },
          { name: 'Room 4', roomType: 'Double/Twin', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const benDrummond = await prisma.Cabin.create({
    data: {
      name: 'Ben Drummond',
      videoUrl: "https://youtube.com/embed/ti_-jLmQrII",
      imageFileName: 'benDrummond.jpeg',
      capacity: 8,
      roomCount: 3,
      hotTub: "Yes",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/Twin Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const benLawers = await prisma.Cabin.create({
    data: {
      name: 'Ben Lawers',
      videoUrl: "https://youtube.com/embed/ti_-jLmQrII",
      imageFileName: 'benLawers.jpg',
      capacity: 8,
      roomCount: 3,
      hotTub: "Heated on request — advance notice required",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double Bunk', capacity: 4, enSuite: false }

        ]
      }
    },
    include: { rooms: true }
  });

  const cottage = await prisma.Cabin.create({
    data: {
      name: 'Cottage',
      videoUrl: "https://youtube.com/embed/zxve8-GkZRU",
      imageFileName: 'cottage.jpg',
      capacity: 8,
      roomCount: 3,
      hotTub: "Heated on request — advance notice required",
      checkIn: "4pm",
      checkOut: "10:30am",
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double + Daybed', capacity: 3, enSuite: true },
          { name: 'Room 2', roomType: 'Double + Daybed', capacity: 3, enSuite: false },
          { name: 'Room 3', roomType: 'Bunk', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  //guests
  const joeAndLaura = await prisma.GuestParty.create({
    data: {
      partyName: 'Joe & Laura',
      token: 'joeAndLaura',
      guestType: 'OnSite',
      inviteCode: 'jir6',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Joe',
            lastName: 'Austin',
            room: {connect: {id: farmhouse.rooms[0].id}},
            relation: 'Groom'
          },
          {
            firstName: 'Laura',
            lastName: 'Smith',
            room: { connect: { id: farmhouse.rooms[0].id } },
            relation: 'Bride'
          }
        ]
      }
    }
  });

  const sonnyAndBecca = await prisma.GuestParty.create({
    data: {
      partyName: 'Sonny & Becca',
      token: 'sonnyAndBecca',
      guestType: 'OnSite',
      inviteCode: '7h7k',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Sonny',
            lastName: 'Cannon',
            room: { connect: { id: farmhouse.rooms[1].id } },
            relation: 'Best Man'
          },
          {
            firstName: 'Becca',
            lastName: 'Roberts',
            room: { connect: { id: farmhouse.rooms[1].id } },
            relation: 'Maid of Honour'
          }
        ]
      }
    }
  });

  const jayAndBecky = await prisma.GuestParty.create({
    data: {
      partyName: 'Jay & Becky',
      token: 'jayAndBecky',
      guestType: 'OnSite',
      inviteCode: '4yhb',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Jay',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[2].id } },
            relation: 'Friend of the Couple'
          },
          {
            firstName: 'Becky',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[2].id } },
            relation: 'Bridesmade'
          }
        ]
      }
    }
  });

  const tomAndToni = await prisma.GuestParty.create({
    data: {
      partyName: 'Tom & Toni',
      token: 'tomAndToni',
      guestType: 'OnSite',
      inviteCode: '8fg9',
      accommodationCost: 22000,
      bookingFee: calculateBookingFee(22000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Tom',
            lastName: 'Speakman',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Toni',
            lastName: 'Abblitt',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Renly',
            lastName: 'Speakman',
            isBaby: true,
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend of the Couples Baby'
          }
        ]
      }
    }
  });

  const connorAndEllie = await prisma.GuestParty.create({
    data: {
      partyName: 'Connor & Ellie',
      token: 'connorAndEllie',
      guestType: 'OnSite',
      inviteCode: '2jiu',
      accommodationCost: 22000,
      bookingFee: calculateBookingFee(22000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Connor',
            lastName: 'Costello',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Ellie',
            lastName: 'Van',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Bridesmaid'
          }
        ]
      }
    }
  });

  const grahamAndPuja = await prisma.GuestParty.create({
    data: {
      partyName: 'Graham & Puja',
      token: 'grahamAndPuja',
      guestType: 'OnSite',
      inviteCode: 'x6mp',
      accommodationCost: 26000,
      bookingFee: calculateBookingFee(26000),
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Graham',
            lastName: 'Frain',
            room: { connect: { id: longhouse.rooms[0].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Puja',
            lastName: 'Biswas',
            room: { connect: { id: longhouse.rooms[0].id } },
             relation: 'Friend of the Couples Partner'
          }
        ]
      }
    }
  });

  const seanAndKim = await prisma.GuestParty.create({
    data: {
      partyName: 'Sean & Kim',
      token: 'seanAndKim',
      guestType: 'OnSite',
      inviteCode: 'ygh3',
      accommodationCost: 26000,
      bookingFee: calculateBookingFee(26000),
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Sean',
            lastName: 'Boardman',
            room: { connect: { id: longhouse.rooms[3].id } },
             relation: 'Groomsmen'
          },
          {
            firstName: 'Kim',
            lastName: '',
            room: { connect: { id: longhouse.rooms[3].id } },
             relation: 'Friend of the Couple'
          }
        ]
      }
    }
  });

  const madeline = await prisma.GuestParty.create({
    data: {
      partyName: 'Madeline',
      token: 'madeline',
      guestType: 'OnSite',
      inviteCode: '5msi',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Madeline',
            lastName: 'Austin',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Sister of the Groom'
          },
        ]
      }
    }
  });

  const kat = await prisma.GuestParty.create({
    data: {
      partyName: 'Kat',
      token: 'kat',
      guestType: 'OnSite',
      inviteCode: '5i2j',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kat',
            lastName: 'Carroll',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Friend of the couple'
          },
        ]
      }
    }
  });

  const natasha = await prisma.GuestParty.create({
    data: {
      partyName: 'Natasha',
      token: 'natasha',
      guestType: 'OnSite',
      inviteCode: '78hg',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Natasha',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Friend of the Couple'
          }
        ]
      }
    }
  });

  const barry = await prisma.GuestParty.create({
    data: {
      partyName: 'Barry',
      token: 'barry',
      guestType: 'OnSite',
      inviteCode: 'nm1p',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Barry',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Friend of the Couple'
          },
        ]
      }
    }
  });

  const patrick = await prisma.GuestParty.create({
    data: {
      partyName: 'Patrick',
      token: 'patrick',
      guestType: 'OnSite',
      inviteCode: '8anw',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Patrick',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
          },
        ]
      }
    }
  });

  const lauren = await prisma.GuestParty.create({
    data: {
      partyName: 'Lauren',
      token: 'lauren',
      guestType: 'OnSite',
      inviteCode: '2q8h',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Lauren',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
          },
        ]
      }
    }
  });

  const connor = await prisma.GuestParty.create({
    data: {
      partyName: 'Connor',
      token: 'connor',
      guestType: 'OnSite',
      inviteCode: '7aj8',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Connor',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
          },
        ]
      }
    }
  });

  const brian = await prisma.GuestParty.create({
    data: {
      partyName: 'Brian',
      token: 'brian',
      guestType: 'OnSite',
      inviteCode: '7q3n',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Brian',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
          },
        ]
      }
    }
  });

  const gary = await prisma.GuestParty.create({
    data: {
      partyName: 'Gary',
      token: 'gary',
      guestType: 'OnSite',
      inviteCode: '9a67',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Gary',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: cottage.rooms[2].id } },
          },
        ]
      }
    }
  });

  const matt = await prisma.GuestParty.create({
    data: {
      partyName: 'Matt',
      token: 'matt',
      guestType: 'OnSite',
      inviteCode: 'ma19',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      guests: {
        create: [
          {
            firstName: 'Matt',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: cottage.rooms[2].id } },
          },
        ]
      }
    }
  });

  const jakeAndAnthea = await prisma.GuestParty.create({
    data: {
      partyName: 'Jake & Anthea',
      token: 'jakeAndAnthea',
      guestType: 'OnSite',
      inviteCode: 'b58x',
      accommodationCost: 26000,
      bookingFee: calculateBookingFee(26000),
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Jake',
            lastName: 'Wright',
            room: { connect: { id: longhouse.rooms[1].id } },
            relation: 'Colleague'
          },
          {
            firstName: 'Anthea',
            lastName: '',
            room: { connect: { id: longhouse.rooms[1].id } },
            relation: 'Colleagues Partner'
          }
        ]
      }
    }
  });

  const leeAndAlly = await prisma.GuestParty.create({
    data: {
      partyName: 'Lee & Ally',
      token: 'leeAndAlly',
      guestType: 'OnSite',
      inviteCode: '9i46',
      accommodationCost: 26000,
      bookingFee: calculateBookingFee(26000),
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Lee',
            lastName: 'Hancock',
            room: { connect: { id: longhouse.rooms[2].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Ally',
            lastName: 'Hancock',
            room: { connect: { id: longhouse.rooms[2].id } },
             relation: 'Friend of the Couple'
          }
        ]
      }
    }
  });

  const peteAndCynthia = await prisma.GuestParty.create({
    data: {
      partyName: 'Pete & Cynthia',
      token: 'peteAndCynthia',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'c2g6',
      guests: {
        create: [
          {
            firstName: 'Pete',
            lastName: '',
          },
          {
            firstName: 'Cynthia',
            lastName: '',
          }
        ]
      }
    }
  });

  const nigelAndRuth = await prisma.GuestParty.create({
    data: {
      partyName: 'Nigel & Ruth',
      token: 'nigelAndRuth',
      guestType: 'OnSite',
      inviteCode: 'k56p',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Nigel',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[0].id } },
             relation: 'Father of the Groom'
          },
          {
            firstName: 'Ruth',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[0].id } },
             relation: 'Mother of the Groom'
          }
        ]
      }
    }
  });

  const mikeAndAnn = await prisma.GuestParty.create({
    data: {
      partyName: 'Mike & Ann',
      token: 'mikeAndAnn',
      guestType: 'OnSite',
      inviteCode: '4gf5',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[1].id } },
             relation: 'Grandfather of the Groom'
          },
          {
            firstName: 'Ann',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[1].id } },
             relation: 'Grandmother of the Groom'
          }
        ]
      }
    }
  });

  const mikeAndEllen = await prisma.GuestParty.create({
    data: {
      partyName: 'Mike & Ellen',
      token: 'mikeAndEllen',
      guestType: 'OnSite',
      inviteCode: '7cvt',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[2].id } },
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Ellen',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[2].id } },
            relation: 'Friend of the Couple'
          }
        ]
      }
    }
  });

  const david = await prisma.GuestParty.create({
    data: {
      partyName: 'David',
      token: 'david',
      guestType: 'OnSite',
      inviteCode: 'drg4',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'David',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Family of the Groom'
          },
        ]
      }
    }
  });

  const steven = await prisma.GuestParty.create({
    data: {
      partyName: 'Steven',
      token: 'steven',
      guestType: 'OnSite',
      inviteCode: '76gj',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Steven',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Family of the Groom'
          },
        ]
      }
    }
  });

  const tom = await prisma.GuestParty.create({
    data: {
      partyName: 'Tom',
      token: 'tom',
      guestType: 'OnSite',
      inviteCode: 'c9hl',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Tom',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Friend of the Couple'
          },
        ]
      }
    }
  });

  const georgeAndRebecca = await prisma.GuestParty.create({
    data: {
      partyName: 'George & Rebecca',
      token: 'georgeAndRebecca',
      guestType: 'OnSite',
      inviteCode: '46vy',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'George',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[0].id } },
            relation: 'Godfather of the Bride'
          },
          {
            firstName: 'Rebecca',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[0].id } },
            relation: 'Godmother of the Bride'
          }
        ]
      }
    }
  });

  const eddieAndMaureen = await prisma.GuestParty.create({
    data: {
      partyName: 'Eddie & Maureen',
      token: 'eddieAndMaureen',
      guestType: 'OnSite',
      inviteCode: 'zv6q',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Eddie',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[1].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Maureen',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[1].id } },
           relation: 'Family of the Bride'
          }
        ]
      }
    }
  });

  const kevinAndLynn = await prisma.GuestParty.create({
    data: {
      partyName: 'Kevin & Lynn',
      token: 'kevinAndLynn',
      guestType: 'AccommodationNotOffered',
      inviteCode: '7ba3',
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Lynn',
            lastName: '',
            relation: 'Family of the Bride'
          }
        ]
      }
    }
  });

  const cieranAndChole = await prisma.GuestParty.create({
    data: {
      partyName: 'Cieran & Chloe',
      token: 'cieranAndChole',
      guestType: 'OnSite',
      inviteCode: 'j8s4',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Cieran',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Chloe',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family of the Bride'
          }
        ]
      }
    }
  });

  const johnAndAndrea = await prisma.GuestParty.create({
    data: {
      partyName: 'John & Andrea',
      token: 'johnAndAndrea',
      guestType: 'OnSite',
      inviteCode: 'k8z3',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'John',
            lastName: 'Scott',
            room: { connect: { id: schiehallion.rooms[3].id } },
            relation: 'Family of the Groom'
          },
          {
            firstName: 'Andrea',
            lastName: 'Scott',
            room: { connect: { id: schiehallion.rooms[3].id } },
            relation: 'Family of the Groom'
          }
        ]
      }
    }
  });

  const dougieAndMaria = await prisma.GuestParty.create({
    data: {
      partyName: 'Dougie & Maria',
      token: 'dougieAndMaria',
      guestType: 'OnSite',
      inviteCode: 'f57n',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benDrummond.id }
      },
      guests: {
        create: [
          {
            firstName: 'Dougie',
            lastName: 'Smith',
            room: { connect: { id: benDrummond.rooms[0].id } },
            relation: 'Father of the Bride'
          },
          {
            firstName: 'Maria',
            lastName: 'Smith',
            room: { connect: { id: benDrummond.rooms[0].id } },
            relation: 'Mother of the Bride'
          }
        ]
      }
    }
  });

  const rossAndNicci = await prisma.GuestParty.create({
    data: {
      partyName: 'Ross & Nicci',
      token: 'rossAndNicci',
      guestType: 'OnSite',
      inviteCode: 'b8pl',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benDrummond.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ross',
            lastName: 'Mitchell',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Nicci',
            lastName: 'Mitchell',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Sister of the Bride'
          },
          {
            firstName: 'Jaxson',
            lastName: 'Mitchell',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Jenson',
            lastName: 'Mitchell',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Skye',
            lastName: 'Mitchell',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family of the Bride'
          }
        ]
      }
    }
  });

  const ryanAndVicky = await prisma.GuestParty.create({
    data: {
      partyName: 'Ryan & Vicky',
      token: 'ryanAndVicky',
      guestType: 'OnSite',
      inviteCode: 'z16f',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benLawers.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ryan',
            lastName: '',
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Vicky',
            lastName: '',
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Mimi-Rose',
            lastName: '',
            isBaby: true,
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Milo',
            lastName: '',
            isChild: true,
            room: { connect: { id: benLawers.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Macie',
            lastName: '',
            isChild: true,
            room: { connect: { id: benLawers.rooms[2].id } },
            relation: 'Family of the Bride'
          }
        ]
      }
    }
  });

  const billy = await prisma.GuestParty.create({
    data: {
      partyName: 'Billy',
      token: 'billy',
      guestType: 'OnSite',
      inviteCode: '1829',
      accommodationCost: 2000,
      bookingFee: calculateBookingFee(2000),
      cabin: {
        connect: { id: benLawers.id }
      },
      guests: {
        create: [
          {
            firstName: 'Billy',
            lastName: '',
            relation: 'Family of the Bride'
          }
        ]
      }
    }
  });


  const williamAndShona = await prisma.GuestParty.create({
    data: {
      partyName: 'William & Shona',
      token: 'williamAndShona',
      guestType: 'OnSite',
      inviteCode: '9pag',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: benLawers.id }
      },
      guests: {
        create: [
          {
            firstName: 'William',
            lastName: '',
            room: { connect: { id: benLawers.rooms[1].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Shona',
            lastName: '',
            room: { connect: { id: benLawers.rooms[1].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Luca',
            lastName: '',
            isChild: true,
            relation: 'Family of the Bride',
            room: { connect: { id: benLawers.rooms[2].id } }
          },
          {
            firstName: 'Holly',
            lastName: '',
            isChild: true,
            relation: 'Family of the Bride',
            room: { connect: { id: benLawers.rooms[2].id } }
          }
        ]
      }
    }
  });

  const kennyAndUna = await prisma.GuestParty.create({
    data: {
      partyName: 'Kenny & Una',
      token: 'kennyAndUna',
      guestType: 'OnSite',
      inviteCode: 'c57x',
      accommodationCost: 22000,
      bookingFee: calculateBookingFee(22000),
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kenny',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Friend of the Couple'
          },
          {
            firstName: 'Una',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Friend of the Couple'
          }
        ]
      }
    }
  });

  const una = await prisma.GuestParty.create({
    data: {
      partyName: 'Una',
      token: 'una',
      guestType: 'OnSite',
      inviteCode: 'q4mg',
      accommodationCost: 11000,
      bookingFee: calculateBookingFee(11000),
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Una',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Brides Guardian Angel Growing Up'
          },
        ]
      }
    }
  });

  const steveAndLinda = await prisma.GuestParty.create({
    data: {
      partyName: 'Steve & Linda',
      token: 'steveAndLinda',
      guestType: 'OnSite',
      inviteCode: 'z61b',
      accommodationCost: 30000,
      bookingFee: calculateBookingFee(30000),
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Steve',
            lastName: 'Morgan',
            room: { connect: { id: cottage.rooms[1].id } },
            relation: 'Family of the Groom'
          },
          {
            firstName: 'Linda',
            lastName: 'Morgan',
            room: { connect: { id: cottage.rooms[1].id } },
            relation: 'Family of the Groom'
          }
        ]
      }
    }
  });

  const rhysandFern = await prisma.GuestParty.create({
    data: {
      partyName: 'Rhys & Fern',
      token: 'rhysAndFern',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'f6z2',
      guests: {
        create: [
          {
            firstName: 'Rhys',
            lastName: '',
             relation: 'Friend of the Couple'
          },
          {
            firstName: 'Fern',
            lastName: '',
             relation: 'Friend of the Couple'
          },
        ]
      }
    }
  });

  const bazAndMary = await prisma.GuestParty.create({
    data: {
      partyName: 'Baz & Mary',
      token: 'bazAndMary',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'm93h',
      guests: {
        create: [
          {
            firstName: 'Baz',
            lastName: '',
          },
          {
            firstName: 'Mary',
            lastName: 'Whitnall',
          },
        ]
      }
    }
  });

  const sarah = await prisma.GuestParty.create({
    data: {
      partyName: 'Sarah',
      token: 'sarah',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'e5u8',
      guests: {
        create: [
          {
            firstName: 'Sarah',
            lastName: 'Whitnall',
          },
        ]
      }
    }
  });

  const jamieAndTabitha = await prisma.GuestParty.create({
    data: {
      partyName: 'Jamie & Tabitha',
      token: 'jamieAndTabitha',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'rtv4',
      guests: {
        create: [
          {
            firstName: 'Jamie',
            lastName: 'Russell',
          },
          {
            firstName: 'Tabitha',
            lastName: 'Russell',
          },
          {
            firstName: 'Hermione',
            lastName: '',
            isChild: true,
          },
        ]
      }
    }
  });

  const ianAndSylvia = await prisma.GuestParty.create({
    data: {
      partyName: 'Ian & Sylvia',
      token: 'ianAndSylvia',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'wvt5',
      guests: {
        create: [
          {
            firstName: 'Ian',
            lastName: '',
          },
          {
            firstName: 'Sylvia',
            lastName: '',
          },
        ]
      }
    }
  });

  const partnerAndMaxine = await prisma.GuestParty.create({
    data: {
      partyName: 'Partner & Maxine',
      token: 'partnerAndMaxine',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'lsy7',
      guests: {
        create: [
          {
            firstName: 'Partner',
            lastName: '',
          },
          {
            firstName: 'Maxine',
            lastName: '',
          },
        ]
      }
    }
  });

  const paulAndAnne = await prisma.GuestParty.create({
    data: {
      partyName: 'Paul & Anne',
      token: 'paulAndAnne',
      guestType: 'AccommodationNotOffered',
      inviteCode: '5xt8',
      guests: {
        create: [
          {
            firstName: 'Paul',
            lastName: '',
          },
          {
            firstName: 'Anne',
            lastName: '',
          },
        ]
      }
    }
  });

  const nigelAndDebra = await prisma.GuestParty.create({
    data: {
      partyName: 'Nigel & Debra',
      token: 'nigelAndDebra',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'q492',
      guests: {
        create: [
          {
            firstName: 'Nigel',
            lastName: 'Ledward',
          },
          {
            firstName: 'Debra',
            lastName: 'Ledward-Fox',
          },
        ]
      }
    }
  });

  const stuartAndDebbie = await prisma.GuestParty.create({
    data: {
      partyName: 'Stuart & Debbie',
      token: 'stuartAndDebbie',
      guestType: 'AccommodationNotOffered',
      inviteCode: '9qna',
      guests: {
        create: [
          {
            firstName: 'Stuart',
            lastName: 'Rankin',
          },
          {
            firstName: 'Debbie',
            lastName: 'Rankin',
          },
        ]
      }
    }
  });

  const lisaAndAndy = await prisma.GuestParty.create({
    data: {
      partyName: 'Lisa & Andy',
      token: 'listAndAndy',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'qzx5',
      guests: {
        create: [
          {
            firstName: 'Lisa',
            lastName: 'Sims',
          },
          {
            firstName: 'Andy',
            lastName: 'Sims',
          },
          {
            firstName: 'Max',
            lastName: 'Sims',
            isChild: true
          },
        ]
      }
    }
  });

  const ianAndTeresa = await prisma.GuestParty.create({
    data: {
      partyName: 'Ian & Teresa',
      token: 'ianAndTeresa',
      guestType: 'AccommodationNotOffered',
      inviteCode: 'ae9a',
      guests: {
        create: [
          {
            firstName: 'Ian',
            lastName: 'Macleod',
          },
          {
            firstName: 'Teresa',
            lastName: 'Macleod',
          },
        ]
      }
    }
  });

  const joyce = await prisma.GuestParty.create({
    data: {
      partyName: 'Joyce',
      token: 'joyce',
      guestType: 'AccommodationNotOffered',
      inviteCode: '8qn2',
      guests: {
        create: [
          {
            firstName: 'Joyce',
            lastName: 'Grant',
          },
        ]
      }
    }
  });

  const mattAndAndrea = await prisma.GuestParty.create({
    data: {
      partyName: 'Matt & Andrea',
      token: 'mattAndAndrea',
      guestType: 'AccommodationNotOffered',
      inviteCode: '1k2n',
      guests: {
        create: [
          {
            firstName: 'Matt',
            lastName: 'Graham',
          },
          {
            firstName: 'Andrea',
            lastName: 'Graham',
          },
          {
            firstName: 'Harper',
            lastName: '',
            isChild: true
          },
          {
            firstName: 'Scarlet',
            lastName: '',
            isChild: true
          },
          {
            firstName: 'Lewis',
            lastName: '',
            isChild: true
          },
        ]
      }
    }
  });

  await prisma.gift.createMany({
    data: [
      // Sully's Garden
        {
          "section": "SullysGarden",
          "name": "Decking Boards (Pack of 4)",
          "description": "To build a safe play space for Sully's adventures",
          "amount": 6875,
          "quantity": 5,
          "imagePath": "/decking.avif"
        },
        {
          "section": "SullysGarden",
          "name": "£50 B&Q Voucher",
          "description": "To help us build something beautiful",
          "amount": 5000,
          "quantity": 10,
          "imagePath": "/BQ_CaseStudy2.1-01.jpg"
        },
        {
          "section": "SullysGarden",
          "name": "Sandpit Set",
          "description": "For messy afternoons in the sunshine",
          "amount": 4000,
          "quantity": 1,
          "imagePath": "/istockphoto-123493359-612x612.jpg"
        },
        {
          "section": "SullysGarden",
          "name": "Garden Furniture Set",
          "description": "A comfy place to relax while Sully plays",
          "amount": 12000,
          "quantity": 3,
          "imagePath": "/istockphoto-1226810755-612x612.jpg"
        },
        {
          "section": "SullysGarden",
          "name": "Outdoor Storage Box",
          "description": "Keep toys and tools safe and tidy",
          "amount": 6000,
          "quantity": 1,
          "imagePath": "/download.jpeg"
        },
        {
          "section": "SullysGarden",
          "name": "Flower & Veggie Planter Boxes",
          "description": "Let's grow something together!",
          "amount": 2500,
          "quantity": 4,
          "imagePath": "/download (1).jpeg"
        },
        {
          "section": "SullysGarden",
          "name": "Child-Safe Garden Tools",
          "description": "Little tools for little green thumbs",
          "amount": 2000,
          "quantity": 1,
          "imagePath": "/download (2).jpeg"
        },
        {
          "section": "SullysGarden",
          "name": "Outdoor Solar Lights",
          "description": "Magical evenings in Sully's garden",
          "amount": 3500,
          "quantity": 2,
          "imagePath": "/shopping.webp"
        },
        {
          "section": "SullysGarden",
          "name": "Mini Climbing Frame",
          "description": "Burning off energy the fun way",
          "amount": 15000,
          "quantity": 1,
          "imagePath": "/download (3).jpeg"
        },
        {
          "section": "SullysGarden",
          "name": "Picnic Bench for Kids",
          "description": "Snack time in the sun!",
          "amount": 4500,
          "quantity": 1,
          "imagePath": "/208080_main_childrens-picnic-table.jpg"
        },
    
    
      // Cruise
    
        {
          "section": "TheCruise",
          "name": "Gunbae Korean BBQ Experience",
          "description": "An interactive Korean BBQ dinner with drinking games and communal seating.",
          "amount": 6000,
          "quantity": 2,
          "imagePath": "/Gunbae-1104x438.avif"
        },
        {
          "section": "TheCruise",
          "name": "Pink Agave Mexican Dinner",
          "description": "A vibrant Mexican dining experience featuring dishes like Cochinita Pibil.",
          "amount": 5500,
          "quantity": 2,
          "imagePath": "/Pink-Agave-1104x438.avif"
      },
      {
        "section": "TheCruise",
        "name": "The Wake Steak & Seafood Experience",
        "description": "An elegant dining experience at The Wake, Virgin Voyages' upscale steak and seafood restaurant, offering panoramic ocean views and a refined menu.",
        "amount": 7000,
        "quantity": 2,
        "imagePath": "/The-Wake-1104x438.avif"
      },      
        {
          "section": "TheCruise",
          "name": "Test Kitchen Experimental Tasting Menu",
          "description": "A multi-course, experimental dining adventure for the culinary curious.",
          "amount": 7000,
          "quantity": 2,
          "imagePath": "/Test-Kitchen-1104x438.avif"
        },
        {
          "section": "TheCruise",
          "name": "£50 Bar Tab",
          "description": "Prepaid £50 Bar Tab , used for onboard beverages.",
          "amount": 4000,
          "quantity": 5,
          "imagePath": "/virgin-bar-tab.avif"
        },
        {
          "section": "TheCruise",
          "name": "£100 Bar Tab",
          "description": "Prepaid £125 Bar Tab, which includes a £25 bonus on our sailing",
          "amount": 10000,
          "quantity": 3,
          "imagePath": "/virgin-bar-tab.avif"
        },
        {
          "section": "TheCruise",
          "name": "Santorini Sunset Cruise",
          "description": "An evening boat tour to witness the iconic Santorini sunset.",
          "amount": 8500,
          "quantity": 2,
          "imagePath": "/santorini-sunset.jpg"
        },
        {
          "section": "TheCruise",
          "name": "Bodrum Turkish Bath Experience",
          "description": "Traditional Hammam spa experience in Bodrum.",
          "amount": 5000,
          "quantity": 2,
          "imagePath": "/bodrum-spa.jpg"
        },
        {
          "section": "TheCruise",
          "name": "Mykonos Beach Club Day",
          "description": "Relaxing day at a renowned Mykonos beach club with sunbeds and cocktails.",
          "amount": 7000,
          "quantity": 2,
          "imagePath": "/mykanos-bech.jpg"
        },
        {
          "section": "TheCruise",
          "name": "Dubrovnik Old Town Walking Tour",
          "description": "Guided tour through the historic streets of Dubrovnik's Old Town.",
          "amount": 4000,
          "quantity": 2,
          "imagePath": "/dubrovnik.jpg"
        },
        {
          "section": "TheCruise",
          "name": "Kotor Bay Boat Tour",
          "description": "Scenic boat ride exploring the stunning Bay of Kotor.",
          "amount": 5500,
          "quantity": 2,
          "imagePath": "/kotor-bay-boat-tour-10.webp"
        },
        {
          "section": "TheCruise",
          "name": "Corfu Olive Oil Tasting",
          "description": "Visit to a local olive oil farm with tastings and insights into production.",
          "amount": 3500,
          "quantity": 2,
          "imagePath": "/olive-oil.jpg"
        }
    ]
  });

  console.log('🌱 Seeded GuestParties and IndividualGuests and gifts');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });