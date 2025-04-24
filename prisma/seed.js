// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
      inviteCode: 'oh7k',
      accommodationCost: 30000,
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
      inviteCode: '8fg0',
      accommodationCost: 22000,
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
      inviteCode: '0gh3',
      accommodationCost: 26000,
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

  const maddie = await prisma.GuestParty.create({
    data: {
      partyName: 'Maddie',
      token: 'maddie',
      guestType: 'OnSite',
      inviteCode: '5msi',
      accommodationCost: 11000,
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

  const natasha = await prisma.GuestParty.create({
    data: {
      partyName: 'Natasha',
      token: 'natasha',
      guestType: 'OnSite',
      inviteCode: '78hg',
      accommodationCost: 11000,
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
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Lauren',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[5].id } },
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
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Gary',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
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
      guests: {
        create: [
          {
            firstName: 'Matt',
            lastName: '',
            relation: 'Friend of the Couple',
            room: { connect: { id: farmhouse.rooms[4].id } },
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
      inviteCode: '9i4o',
      accommodationCost: 26000,
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
      inviteCode: 'c90l',
      accommodationCost: 11000,
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
      inviteCode: 'zv60',
      accommodationCost: 30000,
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
      guestType: 'OnSite',
      inviteCode: '0ba3',
      accommodationCost: 22000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Lynn',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
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
      accommodationCost: 22000,
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
      inviteCode: 'b0pl',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benDrummond.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ross',
            lastName: 'Mitchall',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Nicci',
            lastName: 'Mitchall',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Sister of the Bride'
          },
          {
            firstName: 'Jaxson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Jenson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family of the Bride'
          },
          {
            firstName: 'Skye',
            lastName: 'Mitchall',
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

  const williamAndShona = await prisma.GuestParty.create({
    data: {
      partyName: 'William & Shona',
      token: 'williamAndShona',
      guestType: 'OnSite',
      inviteCode: '0pag',
      accommodationCost: 30000,
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

  const kevin = await prisma.GuestParty.create({
    data: {
      partyName: 'Kevin',
      token: 'kevin',
      guestType: 'OnSite',
      inviteCode: 'q92x',
      accommodationCost: 11000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            room: { connect: { id: cottage.rooms[2].id } },
             relation: 'Friend of the Couple'
          },
        ]
      }
    }
  });

  const rhys = await prisma.GuestParty.create({
    data: {
      partyName: 'Rhys',
      token: 'rhys',
      guestType: 'OnSite',
      inviteCode: 'f6z2',
      accommodationCost: 11000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Rhys',
            lastName: '',
            room: { connect: { id: cottage.rooms[2].id } },
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
      inviteCode: 'qzx5',
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

  await prisma.gift.createMany({
    data: [
      // Sully's Garden
      {
        section: 'SullysGarden',
        name: 'Decking Boards (Pack of 5)',
        description: 'Perfect for Sully’s garden play area',
        amount: 30,
        quantity: 5,
        imagePath: "/garden.jpeg"
      },
      {
        section: 'SullysGarden',
        name: '£50 B&Q Voucher',
        description: 'To help us build something beautiful',
        amount: 50,
        quantity: 5,
        imagePath: "/garden.jpeg"
      },
      {
        section: 'SullysGarden',
        name: 'Sandpit Set',
        description: 'For messy afternoons in the sunshine',
        amount: 40,
        quantity: 1,
        imagePath: "/garden.jpeg"
      },
      {
        section: 'SullysGarden',
        name: 'Garden Furniture',
        description: 'A comfy place to watch Sully play',
        amount: 120,
        quantity: 3,
        imagePath: "/garden.jpeg"
      },

      // Cruise
      {
        section: 'TheCruise',
        name: 'Excursion: Bruges Canal Tour',
        description: 'A scenic boat ride through Bruges',
        amount: 35,
        quantity: 1,
        imagePath: "/cruise.webp"
      },
      {
        section: 'TheCruise',
        name: 'Onboard Couples Massage',
        description: 'A relaxing treat at sea',
        amount: 90,
        quantity: 1,
        imagePath: "/cruise.webp"
      },
      {
        section: 'TheCruise',
        name: 'Specialty Dining Night',
        description: 'Dinner with ocean views',
        amount: 60,
        quantity: 3,
        imagePath: "/cruise.webp"
      },
      {
        section: 'GeneralGifts',
        name: "Wendego",
        description: "",
        amount: 60000,
        quantity: 1,
        imagePath: "/house.jpeg"
      },
      {
        section: 'GeneralGifts',
        name: 'Hoover',
        description: 'Cleaning',
        amount: 200,
        quantity: 1,
        imagePath: "/house.jpeg"
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