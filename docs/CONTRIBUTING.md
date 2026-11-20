# 🤝 Contributing Guidelines

We welcome contributions! Please follow these standards when opening issues or pull requests.

## Development Workflow
1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/awesome-feature
   ```
2. Ensure both backend and frontend test suites pass:
   ```bash
   cd backend && npm test
   cd ../frontend && npx vitest run
   ```
3. Commit your changes using conventional commit messages:
   - `feat(...)`: A new feature
   - `fix(...)`: A bug fix
   - `docs(...)`: Documentation only changes
   - `style(...)`: Formatting or CSS adjustments
   - `test(...)`: Adding or updating tests
4. Push to your branch and open a Pull Request against `main`.
