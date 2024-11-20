insert into users
(id, email, username, role, avatar, fullname, active, projects, created_at)
values
(
  '339cbaac-2731-47a6-b0bb-e68be14addb9',
  'magicpan@example.gg',
  'magicpan',
  'user',
  'https://ui-avatars.com/api/?name=PR&background=4e73df&color=fff',
  'Patrik Radkow',
  'true',
  '{"1e7b566f-27c3-41c9-9a42-a10e3231671c"}',
  '17 Aug 2016'
),
(
  'a65cbfa0-6802-480d-8bb4-26c549139b03',
  'niceadmin@mail.com',
  'admin',
  'admin',
  'https://ui-avatars.com/api/?name=MH&background=1cc88a&color=fff',
  'Martin Hoff',
  'true',
  '{"269ef9d6-3547-4fc3-89a9-b32a3bae798c"}',
  '17 Aug 2016'
),
(
  '4e552ab3-a423-4ac1-a021-67cace904667',
  'ebrown@gmail.com',
  'ebrown',
  'user',
  'https://ui-avatars.com/api/?name=LM&background=36b9cc&color=fff',
  'Liz Macintosh',
  'true',
  '{"4a190c9f-2ed0-4979-94ed-161f37ee4f47"}',
  '17 Aug 2016'
),
(
  'fb440953-7f86-4c2b-aa30-e7e2fd7ad2ca',
  'mrm@gmail.com',
  'mrm',
  'owner',
  'https://ui-avatars.com/api/?name=M2&background=f6c23e&color=fff',
  'M2',
  'true',
  '{"a789a08a-e756-4a53-bc23-af5384576709"}',
  '17 Aug 2016'
),
(
  'b5956956-8b00-4983-881c-dd83837ee62b',
  'kevin@gmail.com',
  'kevin13',
  'user',
  'https://ui-avatars.com/api/?name=KS&background=e74a3b&color=fff',
  'Kevin Smith',
  'true',
  '{"b358b90e-fb17-44b3-b592-180902c83720"}',
  '17 Aug 2016'
),
(
  '3af55b61-8e02-4381-afa7-8feba83a0bfe',
  'martin@gmail.com',
  'martin3',
  'user',
  'https://ui-avatars.com/api/?name=MH&background=858796&color=fff',
  'Martin Hoff',
  'true',
  '{"ccb46af1-a66e-449f-a6c8-493511f6a0fa"}',
  '17 Aug 2016'
),
(
  '5f4b4c3a-5fe3-4525-a86e-e11c5a2e6a81',
  'john@mail.com',
  'john',
  'user',
  'https://ui-avatars.com/api/?name=JD&background=5a5c69&color=fff',
  'John Doe',
  'true',
  '{"e0189db3-6bde-4679-8199-052c78356336"}',
  '17 Aug 2016'
),
(
  '7e50a660-8439-480f-bf76-753e8848d964',
  'maksim@epic.com',
  'maksim',
  'admin',
  'https://ui-avatars.com/api/?name=MN&background=e74a3b&color=fff',
  'Maksim Nedo',
  'true',
  '{"f8815e85-dd4f-4973-aa04-929941fc378d"}',
  '17 Aug 2016'
),
(
  'fb8e615e-5b55-4444-975e-aa8e8ab25455',
  'sconnor@skynet.com',
  'sconnor',
  'user',
  'https://ui-avatars.com/api/?name=SC&background=20c997&color=fff',
  'Sarah Connor',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  '1d3524b4-ed8d-4b91-b7f8-9f10abdf7fa6',
  'tony@starkindustries.com',
  'ironman',
  'admin',
  'null',
  'Tony Stark',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  'aa6730e8-ac37-41e2-88d8-a89a70152513',
  'bbanner@avengers.org',
  'hulk',
  'user',
  'https://ui-avatars.com/api/?name=BB&background=6f42c1&color=fff',
  'Bruce Banner',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  'b762dba8-f4d1-4d27-a00b-aa8869c7feb7',
  'spidey@dailybugle.com',
  'webslinger',
  'user',
  'https://ui-avatars.com/api/?name=PP&background=e83e8c&color=fff',
  'Peter Parker',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  '974d606e-81a9-4346-b117-8e8443c16c59',
  'ww@themyscira.gov',
  'wonderwoman',
  'admin',
  'https://ui-avatars.com/api/?name=DP&background=fd7e14&color=fff',
  'Diana Prince',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  'df2f0afe-4c9e-4a22-861a-3250c07afde9',
  'superman@dailyplanet.com',
  'ckent',
  'user',
  'https://ui-avatars.com/api/?name=CK&background=6610f2&color=fff',
  'Clark Kent',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  '12a983e7-20af-4a5b-820c-4122064dd136',
  'blackwidow@shield.gov',
  'nromanoff',
  'admin',
  'https://ui-avatars.com/api/?name=NR&background=dc3545&color=fff',
  'Natasha Romanoff',
  'true',
  '{}',
  '17 Aug 2016'
),
(
  'f779e25b-e79d-430b-bd4c-887cdc21203a',
  'cap@avengers.org',
  'capamerica',
  'user',
  'https://ui-avatars.com/api/?name=SR&background=007bff&color=fff',
  'Steve Rogers',
  'true',
  '{}',
  '17 Aug 2016'
);

insert into projects
(id, project_name, project_owner, status, created_at, team)
values
(
  '1e7b566f-27c3-41c9-9a42-a10e3231671c',
  'Vuestic',
  '339cbaac-2731-47a6-b0bb-e68be14addb9',
  'in progress',
  '20 Nov 2023',
  '{"339cbaac-2731-47a6-b0bb-e68be14addb9","a65cbfa0-6802-480d-8bb4-26c549139b03","4e552ab3-a423-4ac1-a021-67cace904667"}'
),
(
  '269ef9d6-3547-4fc3-89a9-b32a3bae798c',
  'Mood board',
  'a65cbfa0-6802-480d-8bb4-26c549139b03',
  'important',
  '16 Oct 2023',
  '{"a65cbfa0-6802-480d-8bb4-26c549139b03"}'
),
(
  '4a190c9f-2ed0-4979-94ed-161f37ee4f47',
  'Jenkins',
  '4e552ab3-a423-4ac1-a021-67cace904667',
  'important',
  '1 Oct 2023',
  '{"4e552ab3-a423-4ac1-a021-67cace904667"}'
),
(
  'a789a08a-e756-4a53-bc23-af5384576709',
  'Springfield media',
  'fb440953-7f86-4c2b-aa30-e7e2fd7ad2ca',
  'important',
  '19 Sept 2023',
  '{"fb440953-7f86-4c2b-aa30-e7e2fd7ad2ca"}'
),
(
  'b358b90e-fb17-44b3-b592-180902c83720',
  'Galileo',
  'b5956956-8b00-4983-881c-dd83837ee62b',
  'completed',
  '23 Sept 2023',
  '{"b5956956-8b00-4983-881c-dd83837ee62b"}'
),
(
  'ccb46af1-a66e-449f-a6c8-493511f6a0fa',
  'Website redesign',
  '3af55b61-8e02-4381-afa7-8feba83a0bfe',
  'completed',
  '9 Sept 2023',
  '{"3af55b61-8e02-4381-afa7-8feba83a0bfe"}'
),
(
  'e0189db3-6bde-4679-8199-052c78356336',
  'Toolset landing',
  '5f4b4c3a-5fe3-4525-a86e-e11c5a2e6a81',
  'archived',
  '17 Aug 2023',
  '{"5f4b4c3a-5fe3-4525-a86e-e11c5a2e6a81"}'
),
(
  'f8815e85-dd4f-4973-aa04-929941fc378d',
  'Complete product redesign',
  '7e50a660-8439-480f-bf76-753e8848d964',
  'completed',
  '11 Aug 2023',
  '{"7e50a660-8439-480f-bf76-753e8848d964"}'
);
