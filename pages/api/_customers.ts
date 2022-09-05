export default function handler(req: Request, res: Response) {

  const steps = [
    { 
      name: 'General Information',
      subtitle: 'We use this information to calculate fuel costs and applicable incentives',
      icon: 'info',
      slug: 'general-information',
    },
    { 
      name: 'General Information2',
      subtitle: 'We use this information to calculate fuel costs and applicable incentives 2',
      icon: 'info',
      slug: 'general-information2',
    },
    { 
      name: 'General Information3',
      subtitle: 'We use this information to calculate fuel costs and applicable incentives 3',
      icon: 'info',
      slug: 'general-information3',
    },
    { 
      name: 'General Information4',
      subtitle: 'We use this information to calculate fuel costs and applicable incentives 4',
      icon: 'info',
      slug: 'general-information4',
    },
  ];
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      company: 'Acme',
      email: 'johndoe@example.com',
      status: 'active',
    },
    {
        id: 2,
        name: 'Jane Doe',
        company: 'Ford',
        email: 'janedoe@example.com',
        status: 'active',
    },
    {
        id: 3,
        name: 'Jack Doe',
        company: 'BMW',
        email: 'jackdoe@example.com',
        status: 'inactive',
    },
  ];
  res.status(200).json(steps);
};
