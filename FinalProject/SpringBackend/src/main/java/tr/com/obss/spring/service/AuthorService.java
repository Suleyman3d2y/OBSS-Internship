package tr.com.obss.spring.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tr.com.obss.spring.entity.Author;
import tr.com.obss.spring.model.AuthorDTO;
import tr.com.obss.spring.model.AuthorUpdateDTO;
import tr.com.obss.spring.repo.AuthorRepository;

import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;


    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }


    public Author save(AuthorDTO authorDTO) {
        var author = new Author();
        author.setName(authorDTO.getName());

        return authorRepository.save(author);

    }

    public Author update(long id, AuthorUpdateDTO dto) {
        var author = this.findById(id);
        author.setName(dto.getName());
        return authorRepository.save(author);

    }

    public Author remove(long id) {
        var author = this.findById(id);
        author.setActive(!author.isActive());
        return authorRepository.save(author);

    }

    public Author findById(long id) {
        return authorRepository.findAuthorById(id);
    }

    public Page<Author> findAllWithJpaPagination(int pageNumber, int pageSize) {
        var paged = PageRequest.of(pageNumber, pageSize);
        return authorRepository.findAll(paged);
    }
    //TODO add pagination to this
    public List<Author> findAll() {
        return authorRepository.findAll();
    }




}
