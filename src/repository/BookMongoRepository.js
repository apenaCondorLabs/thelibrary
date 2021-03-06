import mongo from '../utils/mongoHelper';
import Book from '../Models/Book';

module.exports = class BookMongoRepository {

    constructor() {
      this.mongo = mongo;
      this.Book = Book;
      this.mongo.connect();
    }

    /*
      Find all paginate data 
    */
    async findPaginate(query = null, pagNum, row = 10) {
      try {
        let skips = parseInt(row) * (parseInt(pagNum) - 1);
        return await this.Book.find(query).skip(skips).limit(parseInt(row));
      } catch (error) {
        throw new Error(error);
      }
    }

    async find(query = null) {
      try {
        return await this.Book.find(query);
      } catch (error) {
        throw new Error(error);
      }
    }

    async findById(id) {
      try {
        return await this.Book.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    }

    async findOne(query = null) {
      try {
        return await this.Book.findOne(query);
      } catch (error) {
        throw new Error(error);
      }
    }

    async create(data) {
      const newBook = new this.Book(data);
      await newBook.save();
      return newBook;
    }

    async update(id, data) {
      return this.Book.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
      return this.Book.findByIdAndDelete(id);
    }
}