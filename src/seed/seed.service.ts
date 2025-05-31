import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Book } from 'src/books/entities/book.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Status, User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name)
    constructor(@InjectRepository(Author) private readonly authorRepository:Repository<Author>,
    @InjectRepository(Bookreview) private readonly bookreviewRepository:Repository<Bookreview>,
    @InjectRepository(Book) private readonly bookRepository:Repository<Book>,
    @InjectRepository(Category) private readonly categoryRepository:Repository<Category>,
    @InjectRepository(Profile) private readonly profileRepository:Repository<Profile>,
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    private readonly dataSource:DataSource,){}
    async seed() {
        this.logger.log('Started seeding the database');
        try {

        for (let i = 0; i < 50; i++) {
            const profile = this.profileRepository.create({
            bio: faker.person.bio(),
            avatar: faker.image.avatar(),
            dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString(),
            location: faker.location.city()
            });
            const savedProfile = await this.profileRepository.save(profile);
    
            const user = this.userRepository.create({
            name: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            isActive: Status.TRUE,
            profile: savedProfile,
            });
            await this.userRepository.save(user);
        }
    
          // Create Authors and Books
        for (let i = 0; i < 10; i++) {
            const author = this.authorRepository.create({
            name: faker.person.fullName(),
            bio: faker.lorem.paragraph(),
            dateOfBirth: faker.date.birthdate({ min: 30, max: 80, mode: 'age' }).toISOString(),
            isActive: Status.TRUE,
            });
            const savedAuthor = await this.authorRepository.save(author);
    
            for (let j = 0; j < 3; j++) {
            const book = this.bookRepository.create({
                title: faker.lorem.sentence(3),
                description: faker.lorem.paragraph(2),
                publicationYear: faker.date.past().toISOString().split('T')[0],
                isAvailable: Status.TRUE,
                authors: savedAuthor,
            });
            await this.bookRepository.save(book);
            }
        }
    
        const categories: Category[] = [];
        for (let i = 0; i < 5; i++) {
            const category = this.categoryRepository.create({
            name: faker.word.words(1),
            description: faker.lorem.sentence(),
            });
            const savedCategory = await this.categoryRepository.save(category);
            categories.push(savedCategory);
        }
    
        const books = await this.bookRepository.find();
        for (const book of books) {
            book.categories = faker.helpers.arrayElements(categories, 2);
            await this.bookRepository.save(book);
        }
    
        const allUsers = await this.userRepository.find();
        const allBooks = await this.bookRepository.find();
        for (let i = 0; i < 100; i++) {
            const review = this.bookreviewRepository.create({
            content: faker.lorem.sentences(2),
            rating: faker.number.int({ min: 1, max: 5 }),
            createdAt: new Date(),
            users: faker.helpers.arrayElement(allUsers), 
            books: faker.helpers.arrayElement(allBooks), 
            });
            await this.bookreviewRepository.save(review);
        }
        } catch (error) {
        this.logger.error('Seeding failed', error.stack);
        }
    }
    }

